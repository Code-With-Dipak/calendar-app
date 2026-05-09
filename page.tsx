'use client';

import { useState } from 'react';
import Calendar from '../components/Calendar';
import NotesPanel from '../components/NotesPanel';
import Image from 'next/image';


export default function HomePage() {
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  const handleDateSelect = (clickedDate: Date | null) => {
    if (!clickedDate) return;

    clickedDate.setHours(0, 0, 0, 0);

    if (!selectedStart || selectedStart.getTime() !== clickedDate.getTime()) {
      setSelectedStart(clickedDate);
      setSelectedEnd(null);
      return;
    }

    if (!selectedEnd) {
      const newEnd = clickedDate;
      if (newEnd.getTime() <= selectedStart!.getTime()) {
        setSelectedEnd(null);
        return;
      }
      setSelectedEnd(newEnd);
      return;
    }

    // Reset if clicking selected range
    /// If clicked date is within the current range, reset selection
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  return (
    <main className="min-h-screen px-4 py-12 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-calendar-text via-orange-700 to-amber-800 bg-clip-text">
          Interactive Wall Calendar
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600">
          Select date range, add notes, and organize your month like a real wall calendar.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-4 lg:gap-12">
        {/* Hero Image */}
        <div className="lg:col-span-1">
          <div className="relative">
            <Image
src="/images/Wall-Calendars-3.webp"
alt="Quapri Wall Calendar Hero"
              width={400}
              height={500}
              className="w-full h-auto mx-auto transition-transform duration-300 shadow-paper rounded-3xl hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Calendar + Notes */}
        <div className="space-y-8 lg:col-span-3 lg:max-w-4xl">
          <Calendar 
            onDateSelect={handleDateSelect}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
          />
          <NotesPanel 
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
          />
        </div>
      </div>

      {/* Selection info */}
      {(selectedStart || selectedEnd) && (
        <div className="p-6 mt-12 text-center shadow-sm bg-paper-100 rounded-2xl">
          <p className="text-lg text-calendar-text">
            {selectedStart && !selectedEnd && `Selected start: ${selectedStart.toLocaleDateString()}`}
            {selectedStart && selectedEnd && `Selected range: ${selectedStart.toLocaleDateString()} to ${selectedEnd.toLocaleDateString()}`}
            {selectedStart && selectedEnd && ` (${Math.floor((selectedEnd.getTime() - selectedStart.getTime()) / (1000 * 60 * 60 * 24)) + 1} days)`}
          </p>
          <button
            onClick={() => {
              setSelectedStart(null);
              setSelectedEnd(null);
            }}
            className="px-8 py-3 mt-4 font-semibold text-white transition-all bg-red-500 shadow-lg rounded-xl hover:bg-red-600"
          >
            Clear Selection
          </button>
        </div>
      )}
    </main>
  );
}

