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
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-calendar-text via-orange-700 to-amber-800 bg-clip-text text-transparent mb-4">
          Interactive Wall Calendar
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select date range, add notes, and organize your month like a real wall calendar.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 items-start">
        {/* Hero Image */}
        <div className="lg:col-span-1">
          <div className="relative">
            <Image
src="/images/Wall-Calendars-3.webp"
alt="Quapri Wall Calendar Hero"
              width={400}
              height={500}
              className="w-full h-auto shadow-paper rounded-3xl hover:scale-105 transition-transform duration-300 mx-auto"
              priority
            />
          </div>
        </div>

        {/* Calendar + Notes */}
        <div className="lg:col-span-3 space-y-8 lg:max-w-4xl">
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
        <div className="mt-12 text-center p-6 bg-paper-100 rounded-2xl shadow-sm">
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
            className="mt-4 px-8 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all shadow-lg"
          >
            Clear Selection
          </button>
        </div>
      )}
    </main>
  );
}

