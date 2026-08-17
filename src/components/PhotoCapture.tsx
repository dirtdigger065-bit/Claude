import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, MapPin, X, Save } from 'lucide-react';
import { Job, Photo, User } from '../types';
import { getPhotos, savePhotos, genId, now, getCurrentPosition, centralDate } from '../utils/supabase';

interface Props {
  jobs: Job[];
  currentUser: User;
  preselectedJobId: string | null;
  onBack: () => void;
  onSaved: () => void;
}

const PHOTO_TYPES = ['Progress', 'Issue', 'Before', 'After', 'Material Ticket', 'Trucking Ticket', 'Receipt', 'Other'];

export const PhotoCapture: React.FC<Props> = ({ jobs, currentUser: _currentUser, preselectedJobId, onBack, onSaved }) => {
  const [jobId, setJobId] = useState(preselectedJobId || '');
  const [caption, setCaption] = useState('');
  const [photoType, setPhotoType] = useState('Progress');
  const [photoDate, setPhotoDate] = useState(() => centralDate());
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [gpsLat, setGpsLat] = useState<number | undefined>();
  const [gpsLng, setGpsLng] = useState<number | undefined>();
  const [gpsAccuracy, setGpsAccuracy] = useState<number | undefined>();
  const [gpsStatus, setGpsStatus] = useState('Getting location...');
  const [existingPhotos, setExistingPhotos] = useState<Photo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPhotos();
    grabGps();
  }, []);

  const loadPhotos = async () => {
    const photos = await getPhotos();
    setExistingPhotos(photos);
  };

  const grabGps = async () => {
    const pos = await getCurrentPosition();
    if (pos) {
      setGpsLat(pos.lat);
      setGpsLng(pos.lng);
      setGpsAccuracy(pos.accuracy);
      setGpsStatus(`📍 ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)} (±${Math.round(pos.accuracy)}m)`);
    } else {
      setGpsStatus('📍 Location unavailable');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const canvas = document.createElement('canvas');
      const img = new window.Image();
      img.onload = () => {
        const maxW = 1200;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Stamp GPS and timestamp on photo
        const timestamp = new Date().toLocaleString();
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
        ctx.fillStyle = '#fff';
        ctx.font = '14px sans-serif';
        const stampText = gpsLat
          ? `${timestamp}  |  GPS: ${gpsLat.toFixed(4)}, ${gpsLng?.toFixed(4)}`
          : `${timestamp}`;
        ctx.fillText(stampText, 8, canvas.height - 10);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPreview(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSave = async () => {
    if (!jobId || !preview) return;
    setSaving(true);
    try {
      // Create thumbnail
      const canvas = document.createElement('canvas');
      const img = new window.Image();
      await new Promise<void>((resolve) => {
        img.onload = () => {
          canvas.width = 200;
          canvas.height = 200 * (img.height / img.width);
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        img.src = preview;
      });
      const thumbnail = canvas.toDataURL('image/jpeg', 0.5);

      const photo: Photo = {
        id: genId('photo'),
        job_id: jobId,
        daily_log_id: '',
        caption,
        photo_type: photoType,
        thumbnail,
        full_image: preview,
        gps_lat: gpsLat,
        gps_lng: gpsLng,
        gps_accuracy: gpsAccuracy,
        taken_at: (() => {
          const todayStr = centralDate();
          // If the chosen date is today, keep the exact current time.
          // Otherwise (back-dated), stamp noon of the chosen day.
          return photoDate === todayStr
            ? new Date().toISOString()
            : new Date(`${photoDate}T12:00:00`).toISOString();
        })(),
        created_at: now(),
      };

      const photos = await getPhotos();
      photos.push(photo);
      await savePhotos(photos);
      
      setPreview('');
      setCaption('');
      setPhotoDate(centralDate());
      onSaved();
      loadPhotos();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save photo.');
    }
    setSaving(false);
  };

  const jobPhotos = existingPhotos.filter(p => p.job_id === jobId);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-3 bg-base-200">
        <button className="btn btn-ghost btn-sm btn-circle" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-bold text-lg flex-1">Photos</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Job Selection */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold">Job</span></label>
          <select
            className="select select-bordered w-full"
            value={jobId}
            onChange={e => setJobId(e.target.value)}
          >
            <option value="">Select job...</option>
            {jobs.filter(j => j.status === 'active').map(j => (
              <option key={j.id} value={j.id}>{j.job_number} — {j.client_name}</option>
            ))}
          </select>
        </div>

        {/* GPS Status */}
        <div className="text-xs text-base-content/50 flex items-center gap-1">
          <MapPin size={12} /> {gpsStatus}
        </div>

        {/* Capture */}
        <div className="flex gap-2">
          <button className="btn btn-primary flex-1 gap-2" onClick={() => fileInputRef.current?.click()}>
            <Camera size={18} /> Take Photo
          </button>
          <button className="btn btn-outline flex-1 gap-2" onClick={() => galleryInputRef.current?.click()}>
            🖼️ Choose File
          </button>
        </div>

        {/* Preview & metadata */}
        {preview && (
          <div className="card bg-base-200 p-3 space-y-3">
            <div className="relative">
              <img src={preview} className="w-full rounded-lg" alt="preview" />
              <button
                className="btn btn-circle btn-xs btn-error absolute top-2 right-2"
                onClick={() => setPreview('')}
              >
                <X size={12} />
              </button>
            </div>

            <select
              className="select select-bordered select-sm w-full"
              value={photoType}
              onChange={e => setPhotoType(e.target.value)}
            >
              {PHOTO_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <input
              className="input input-bordered input-sm w-full"
              placeholder="Caption (optional)"
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />

            <div className="form-control">
              <label className="label py-1"><span className="label-text text-sm">📅 Date taken</span></label>
              <input
                type="date"
                className="input input-bordered input-sm w-full"
                value={photoDate}
                max={centralDate()}
                onChange={e => setPhotoDate(e.target.value)}
              />
              <span className="text-xs text-base-content/50 mt-1">Defaults to today. Change it to back-date a photo from an earlier day.</span>
            </div>

            <button
              className="btn btn-success btn-sm w-full gap-1"
              onClick={handleSave}
              disabled={saving || !jobId}
            >
              {saving ? <span className="loading loading-spinner loading-xs" /> : <Save size={16} />}
              Save Photo
            </button>
          </div>
        )}

        {/* Existing photos for this job */}
        {jobId && jobPhotos.length > 0 && (
          <>
            <div className="divider text-sm">Photos for this job ({jobPhotos.length})</div>
            <div className="grid grid-cols-3 gap-2">
              {jobPhotos.map(p => (
                <div key={p.id} className="relative">
                  <img src={p.thumbnail || p.full_image} className="w-full h-24 object-cover rounded" alt={p.caption} />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-1 py-0.5 truncate rounded-b">
                    {p.photo_type}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Camera input (mobile) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* Gallery/file input (desktop & mobile gallery) */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
