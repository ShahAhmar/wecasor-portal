import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

const content = {
    en: {
        hero: {
            title: "Call for Abstracts",
            subtitle: "WeCASOR Abuja 2026 Conference",
            cta: "Submit Now"
        },
        why: {
            title: "Why Submit?",
            items: [
                "Pan-African visibility",
                "Publication opportunity in PillarScholar special issue",
                "Research network participation"
            ]
        },
        thematic: {
            title: "Thematic Areas",
            areas: [
                "Stroke Epidemiology",
                "Cardiovascular Risk & Prevention",
                "Clinical Stroke Management",
                "Community Health & Access",
                "Health Communication & Behavior",
                "Clinical Research Systems",
                "Digital Health & Innovation",
                "Health Systems, Policy & Implementation",
                "Data Science, AI & Predictive Modeling"
            ]
        },
        dates: {
            title: "Important Dates",
            items: [
                { label: "Opens", date: "May 15, 2026" },
                { label: "Deadline", date: "August 15, 2026" },
                { label: "Notification", date: "September 1, 2026" }
            ]
        },
        guidelines: {
            title: "Submission Guidelines",
            text: "Abstracts must be between 250–300 words and follow a structured format (Introduction, Methods, Results, Conclusion)."
        },
        form: {
            title: "Abstract Submission Form",
            name: "Full Name",
            email: "Email Address",
            institution: "Institution",
            country: "Country",
            title_field: "Title of Abstract",
            content_field: "Abstract Content (250-300 words)",
            thematic_field: "Thematic Area",
            type_field: "Presentation Type",
            submit: "Submit Abstract"
        }
    },
    fr: {
        hero: {
            title: "Appel à soumission de résumés",
            subtitle: "Conférence WeCASOR Abuja 2026",
            cta: "Soumettre maintenant"
        },
        why: {
            title: "Pourquoi soumettre?",
            items: [
                "Présentation panafricaine",
                "Possibilité de publication (PillarScholar)",
                "Réseau de recherche"
            ]
        },
        thematic: {
            title: "Domaines thématiques",
            areas: [
                "Épidémiologie des AVC",
                "Risques cardiovasculaires",
                "Prise en charge clinique",
                "Santé communautaire",
                "Communication en santé",
                "Recherche clinique",
                "Santé numérique et IA",
                "Systèmes de santé et politiques",
                "Data Science et Modélisation"
            ]
        },
        dates: {
            title: "Dates importantes",
            items: [
                { label: "Ouverture", date: "15 mai 2026" },
                { label: "Clôture", date: "15 août 2026" },
                { label: "Notification", date: "1er septembre 2026" }
            ]
        },
        guidelines: {
            title: "Directives",
            text: "Les résumés doivent compter entre 250 et 300 mots et suivre un format structuré."
        },
        form: {
            title: "Formulaire de soumission",
            name: "Nom complet",
            email: "Adresse e-mail",
            institution: "Institution",
            country: "Pays",
            title_field: "Titre du résumé",
            content_field: "Contenu du résumé (250-300 mots)",
            thematic_field: "Domaine thématique",
            type_field: "Type de présentation",
            submit: "Soumettre maintenant"
        }
    }
};

export default function AbstractSubmission({ language = 'en' }) {
    const t = content[language] || content.en;

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        institution: '',
        country: '',
        title: '',
        abstract_content: '',
        thematic_area: '',
        presentation_type: 'Oral',
        language: language
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/abstract-submission-2026/submit', {
            onSuccess: () => {
                // Success state is handled by useForm's wasSuccessful
            }
        });
    };

    if (wasSuccessful) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-100">
                    <div className="w-20 h-20 bg-blue-100 text-[#002d5b] rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">{language === 'fr' ? 'Soumission Réussie!' : 'Submission Successful!'}</h2>
                    <p className="text-slate-500 font-medium mb-8">
                        {language === 'fr' 
                            ? 'Votre résumé a été reçu et sera examiné par le comité scientifique.' 
                            : 'Your abstract has been received and will be reviewed by the scientific committee.'}
                    </p>
                    <Link href="/abuja-conference-2026" className="inline-block px-8 py-4 bg-[#002d5b] text-white rounded-2xl font-black uppercase tracking-widest text-xs">
                        {language === 'fr' ? 'Retour' : 'Back to Home'}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <Head title={t.hero.title} />

            {/* Language Toggle */}
            <div className="fixed top-6 right-6 z-50">
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-1 rounded-2xl shadow-xl flex gap-1">
                    <Link href="?lang=en" className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${language === 'en' ? 'bg-[#002d5b] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>EN</Link>
                    <Link href="?lang=fr" className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${language === 'fr' ? 'bg-[#002d5b] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>FR</Link>
                </div>
            </div>

            {/* Hero / Header */}
            <header className="bg-slate-50 border-b border-slate-200 py-24">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">PillarScholar Academic Portal</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{t.hero.title}</h1>
                    <p className="text-xl text-slate-500 font-medium">{t.hero.subtitle}</p>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    
                    {/* Information Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Why Submit */}
                        <div>
                            <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-[#002d5b]">{t.why.title}</h3>
                            <ul className="space-y-4">
                                {t.why.items.map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <p className="text-slate-600 font-medium leading-tight">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dates */}
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                            <h3 className="text-lg font-black mb-6 uppercase tracking-widest">{t.dates.title}</h3>
                            <div className="space-y-6">
                                {t.dates.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                                        <span className="font-black text-slate-900">{item.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Thematic Areas */}
                        <div>
                            <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-[#002d5b]">{t.thematic.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {t.thematic.areas.map((area, idx) => (
                                    <span key={idx} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-200">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">{t.form.title}</h2>
                            <p className="text-slate-500 mb-12 font-medium">{t.guidelines.text}</p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.name}</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold" />
                                        {errors.name && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.email}</label>
                                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold" />
                                        {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.institution}</label>
                                        <input type="text" value={data.institution} onChange={e => setData('institution', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.country}</label>
                                        <input type="text" value={data.country} onChange={e => setData('country', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.title_field}</label>
                                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-black text-lg" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.thematic_field}</label>
                                        <select value={data.thematic_area} onChange={e => setData('thematic_area', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold appearance-none">
                                            <option value="">Select Area</option>
                                            {t.thematic.areas.map((area, idx) => <option key={idx} value={area}>{area}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.type_field}</label>
                                        <div className="flex gap-4">
                                            {['Oral', 'Poster'].map(type => (
                                                <button key={type} type="button" onClick={() => setData('presentation_type', type)} className={`flex-1 py-4 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${data.presentation_type === type ? 'bg-[#002d5b] text-white border-[#002d5b]' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}>
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.form.content_field}</label>
                                    <textarea rows="10" value={data.abstract_content} onChange={e => setData('abstract_content', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-6 focus:border-[#002d5b] outline-none transition-all font-medium leading-relaxed"></textarea>
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Word Count: {data.abstract_content.trim().split(/\s+/).filter(x => x.length > 0).length}</span>
                                        {errors.abstract_content && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest">{errors.abstract_content}</p>}
                                    </div>
                                </div>

                                <button type="submit" disabled={processing} className="w-full bg-[#002d5b] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-blue-900/30 hover:bg-[#00346a] transition-all transform hover:-translate-y-1">
                                    {processing ? 'Processing...' : t.form.submit}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
