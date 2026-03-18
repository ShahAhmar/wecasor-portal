@extends('layouts.admin')

@section('title', 'Upload Document')

@section('content')
<div class="max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-slate-800 tracking-tight">Upload Document</h1>
            <p class="text-slate-500 text-sm mt-1">Add new materials to the secure research vault.</p>
        </div>
        <a href="{{ route('documents.index') }}" class="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
            Back to Vault
        </a>
    </div>

    <!-- Upload Card -->
    <div class="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <form action="{{ route('documents.store') }}" method="POST" enctype="multipart/form-data" class="p-12 space-y-8">
            @csrf
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Title -->
                <div class="md:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Display Title</label>
                    <input type="text" name="title" required
                        class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700"
                        placeholder="e.g., Study Protocol v1.2">
                    @error('title') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>

                <!-- Study -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Related Study</label>
                    <div class="relative">
                        <select name="study_id" required
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700 appearance-none">
                            <option value="" disabled selected>Select a study</option>
                            @foreach($studies as $study)
                                <option value="{{ $study->id }}">{{ $study->title }}</option>
                            @endforeach
                        </select>
                        <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <!-- Category -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Document Category</label>
                    <div class="relative">
                        <select name="document_category_id" required
                            class="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-700 appearance-none">
                            <option value="" disabled selected>Select category</option>
                            @php $categories = \App\Models\DocumentCategory::all(); @endphp
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                            @endforeach
                        </select>
                        <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <!-- File -->
                <div class="md:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Secure File Attachment (Max 10MB)</label>
                    <div class="relative group">
                        <input type="file" name="file" required
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" id="fileInput">
                        <div class="p-12 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50 flex flex-col items-center justify-center transition-all group-hover:border-emerald-500/30 group-hover:bg-emerald-50/30 text-center">
                            <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-4 group-hover:text-emerald-500 transition-colors">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            </div>
                            <span class="text-sm font-bold text-slate-700 block mb-1">Click or drag to secure upload</span>
                            <span class="text-[10px] text-slate-400 uppercase tracking-widest font-bold" id="fileName">PDF, DOCX, ZIP, JPG</span>
                        </div>
                    </div>
                    @error('file') <p class="text-rose-500 text-xs mt-2 font-medium">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="flex items-center justify-between pt-8 border-t border-slate-50">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px]">All uploads are encrypted and logged for audit compliance.</p>
                <button type="submit" class="px-10 py-4 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/10 active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
                    Confirm Upload
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const fileName = e.target.files[0]?.name || 'PDF, DOCX, ZIP, JPG';
        document.getElementById('fileName').textContent = fileName;
        document.getElementById('fileName').classList.add('text-emerald-600');
    });
</script>
@endsection
