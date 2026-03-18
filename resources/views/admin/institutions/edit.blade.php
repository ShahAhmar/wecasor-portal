@extends('layouts.admin')

@section('title', 'Edit Institution')

@section('content')
<div class="max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Update Site Details</h1>
            <p class="text-slate-500 text-sm mt-1">Modify the registration details for {{ $institution->name }}.</p>
        </div>
        <a href="{{ route('institutions.index') }}" class="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
            Cancel
        </a>
    </div>

    <!-- Edit Card -->
    <div class="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <form action="{{ route('institutions.update', $institution) }}" method="POST" class="p-12 space-y-8">
            @csrf
            @method('PUT')
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Institution Name -->
                <div class="md:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Institution Name</label>
                    <input type="text" name="name" value="{{ old('name', $institution->name) }}" required
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700">
                    @error('name') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>

                <!-- Country -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Country</label>
                    <input type="text" name="country" value="{{ old('country', $institution->country) }}" required
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700">
                    @error('country') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>

                <!-- City -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">City</label>
                    <input type="text" name="city" value="{{ old('city', $institution->city) }}" required
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700">
                    @error('city') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>

                <!-- Institution Type -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Institution Type</label>
                    <div class="relative">
                        <select name="type" required
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700 appearance-none">
                            <option value="university" {{ old('type', $institution->type) == 'university' ? 'selected' : '' }}>University</option>
                            <option value="research_center" {{ old('type', $institution->type) == 'research_center' ? 'selected' : '' }}>Research Center</option>
                            <option value="hospital" {{ old('type', $institution->type) == 'hospital' ? 'selected' : '' }}>Hospital/Clinic</option>
                            <option value="ngo" {{ old('type', $institution->type) == 'ngo' ? 'selected' : '' }}>NGO</option>
                            <option value="other" {{ old('type', $institution->type) == 'other' ? 'selected' : '' }}>Other</option>
                        </select>
                        <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <!-- Contact Person -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Primary PI / Contact</label>
                    <input type="text" name="contact_person" value="{{ old('contact_person', $institution->contact_person) }}" required
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700">
                    @error('contact_person') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>

                <!-- Official Email -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Official Email</label>
                    <input type="email" name="email" value="{{ old('email', $institution->email) }}" required
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700">
                    @error('email') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>

                <!-- Phone Number -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
                    <input type="text" name="phone" value="{{ old('phone', $institution->phone) }}"
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700">
                    @error('phone') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="flex items-center justify-between pt-8 border-t border-slate-50">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Changes are logged for audit compliance.</p>
                <button type="submit" class="px-10 py-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/10 active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
                    Update Institution
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
