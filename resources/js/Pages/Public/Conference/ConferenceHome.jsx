import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

const content = {
    en: {
        hero: {
            title: "WeCASOR Abuja 2026 Conference",
            subtitle: "Stroke & Cardiovascular Outcomes in Africa: From Community Detection to Advanced Care Systems",
            date: "September 24–25, 2026",
            location: "Abuja, Nigeria",
            note: "Hosted by FCT Ministry of Health (Pending endorsement)",
            cta_reg: "Register Now",
            cta_abstract: "Submit Abstract",
            cta_partner: "Become a Partner"
        },
        about: {
            title: "About the Conference",
            text: "The WeCASOR Abuja 2026 Conference is a premier Pan-African gathering dedicated to improving stroke and cardiovascular outcomes. By fostering collaboration between clinicians, researchers, and public health experts, we aim to bridge the gap from community-level detection to advanced care systems. Our network is committed to data-driven research and system strengthening across the continent."
        },
        why: {
            title: "Why Attend?",
            items: [
                "Learn from African & international experts",
                "Participate in real research (WeCASOR datasets)",
                "Hands-on workshops (Day 2)",
                "Networking with institutions",
                "Certification"
            ]
        },
        tracks: {
            title: "Program Overview",
            items: [
                "Clinical Excellence",
                "Research & Data (WeCASOR)",
                "Public Health & Communication",
                "Community & Prevention",
                "Workshops (Day 2)"
            ]
        },
        matters: {
            title: "Why This Conference Matters Now",
            text: "With a rising stroke burden across Africa and significant systems gaps, this conference serves as a critical junction for developing localized, effective solutions."
        },
        who: {
            title: "Who Should Attend?",
            items: ["Clinicians", "Public health experts", "Researchers", "Students"]
        }
    },
    fr: {
        hero: {
            title: "Conférence WeCASOR Abuja 2026",
            subtitle: "Résultats des AVC et des maladies cardiovasculaires en Afrique : de la détection communautaire aux systèmes de soins avancés",
            date: "24–25 septembre 2026",
            location: "Abuja, Nigeria",
            note: "Organisé par le ministère de la Santé du FCT (En attente d'approbation)",
            cta_reg: "S’inscrire maintenant",
            cta_abstract: "Soumettre un résumé",
            cta_partner: "Devenir partenaire"
        },
        about: {
            title: "À propos de la conférence",
            text: "La conférence WeCASOR Abuja 2026 est un rassemblement panafricain de premier plan dédié à l'amélioration des résultats en matière d'AVC et de maladies cardiovasculaires. En favorisant la collaboration entre cliniciens, chercheurs et experts en santé publique, nous visons à combler le fossé entre la détection au niveau communautaire et les systèmes de soins avancés."
        },
        why: {
            title: "Pourquoi participer?",
            items: [
                "Apprendre auprès d’experts",
                "Participer à des recherches (données WeCASOR)",
                "Ateliers pratiques (Jour 2)",
                "Réseautage avec des institutions",
                "Certification"
            ]
        },
        tracks: {
            title: "Programme",
            items: [
                "Excellence clinique",
                "Recherche et données (WeCASOR)",
                "Santé publique et communication",
                "Prévention communautaire",
                "Ateliers (Jour 2)"
            ]
        },
        matters: {
            title: "Pourquoi cette conférence est importante maintenant",
            text: "Face à l'augmentation de la charge des AVC en Afrique et aux lacunes importantes des systèmes, cette conférence constitue un carrefour critique pour élaborer des solutions locales efficaces."
        },
        who: {
            title: "Qui devrait participer?",
            items: ["Cliniciens", "Experts en santé publique", "Chercheurs", "Étudiants"]
        }
    }
};

export default function ConferenceHome({ language = 'en' }) {
    const t = content[language] || content.en;

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
            <Head title={t.hero.title} />

            {/* Language Toggle & Top Bar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <img src="/images/wecasor-logo.png" alt="WeCASOR Logo" className="h-12 w-auto object-contain" />
                    
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-50 border border-slate-200 p-1 rounded-2xl flex gap-1 shadow-inner">
                            <Link 
                                href="/abuja-conference-2026?lang=en" 
                                className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${language === 'en' ? 'bg-[#002d5b] text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:text-[#002d5b]'}`}
                            >
                                ENGLISH
                            </Link>
                            <Link 
                                href="/abuja-conference-2026?lang=fr" 
                                className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${language === 'fr' ? 'bg-[#002d5b] text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:text-[#002d5b]'}`}
                            >
                                FRANÇAIS
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-slate-50/50">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-emerald-100/60 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-full mb-8 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[#002d5b] text-[11px] font-black uppercase tracking-widest">{t.hero.date} • {t.hero.location}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-[#002d5b] leading-[1.05] mb-8 tracking-tight">
                            {t.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-12 max-w-3xl border-l-4 border-emerald-500 pl-6">
                            {t.hero.subtitle}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 items-center">
                            <Link href="#register" className="px-8 py-5 bg-[#002d5b] text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-[#002d5b]/20 hover:bg-[#001a35] transition-all transform hover:-translate-y-1">
                                {t.hero.cta_reg}
                            </Link>
                            <Link href="/abstract-submission-2026" className="px-8 py-5 bg-white text-emerald-600 border border-emerald-100 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/5 hover:border-emerald-200 hover:bg-emerald-50 transition-all transform hover:-translate-y-1">
                                {t.hero.cta_abstract}
                            </Link>
                            <button className="px-8 py-5 text-slate-500 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:text-[#002d5b] transition-colors ml-2">
                                {t.hero.cta_partner}
                            </button>
                        </div>
                        <p className="mt-10 text-slate-400 text-[10px] font-bold italic tracking-widest uppercase">
                            * {t.hero.note}
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-32 bg-white relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-[#002d5b] mb-8 tracking-tight">{t.about.title}</h2>
                            <p className="text-lg text-slate-600 leading-loose mb-12 font-medium italic border-l-2 border-slate-100 pl-6">
                                "{t.about.text}"
                            </p>
                            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                                <h3 className="text-xl font-black text-[#002d5b] mb-4">{t.matters.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    {t.matters.text}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {t.why.items.map((item, idx) => (
                                <div key={idx} className={`p-8 rounded-[2.5rem] ${idx % 2 === 0 ? 'bg-[#002d5b] text-white' : 'bg-emerald-50 text-[#002d5b] border border-emerald-100'} flex flex-col justify-between group hover:shadow-xl transition-all hover:-translate-y-1`}>
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-10 transition-all ${idx % 2 === 0 ? 'bg-white/10' : 'bg-emerald-500 text-white'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <p className="font-black text-sm uppercase tracking-wider leading-snug">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Section */}
            <section className="py-32 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-[#002d5b] mb-6">{t.tracks.title}</h2>
                        <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {t.tracks.items.map((track, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 hover:-translate-y-2 transition-all text-center group">
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-4 block group-hover:text-emerald-600">Track 0{idx+1}</span>
                                <p className="font-bold text-slate-700 leading-tight group-hover:text-[#002d5b]">{track}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expert Additions: Who Should Attend */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-[#002d5b] rounded-[4rem] p-16 md:p-24 relative overflow-hidden text-center text-white shadow-2xl">
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-16">{t.who.title}</h2>
                            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
                                {t.who.items.map((who, idx) => (
                                    <div key={idx} className="text-center group">
                                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mb-6 mx-auto group-hover:bg-emerald-500 group-hover:border-emerald-400 group-hover:-translate-y-2 transition-all duration-300 shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <p className="font-black text-lg uppercase tracking-wider text-slate-100">{who}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section id="register" className="py-32 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-white rounded-[4rem] shadow-xl overflow-hidden border border-slate-200 flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-[#002d5b] p-12 text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-black mb-6 uppercase tracking-tight leading-tight">Confirm Your Attendance</h3>
                                <p className="text-blue-100 font-medium leading-relaxed opacity-80">Join the most influential gathering of stroke and cardiovascular health experts in Africa.</p>
                            </div>
                            <div className="space-y-6 mt-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <p className="text-sm font-bold tracking-wide">2 Full Days</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <p className="text-sm font-bold tracking-wide">Abuja, Nigeria</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-12 md:p-16">
                            <RegistrationForm language={language} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Sharing Section */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-sm font-black text-slate-400 mb-8 uppercase tracking-[0.3em]">Share with your network</h3>
                    <div className="flex justify-center gap-6">
                        <button 
                            onClick={() => {
                                const text = encodeURIComponent("Join me at the WeCASOR Abuja 2026 Conference! Check it out: " + window.location.href);
                                window.open(`https://wa.me/?text=${text}`, '_blank');
                            }}
                            className="w-14 h-14 bg-slate-50 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-[1.5rem] border border-slate-100 flex items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                             <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </button>
                        <button 
                            onClick={() => {
                                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                            }}
                            className="w-14 h-14 bg-slate-50 text-[#0077B5] hover:bg-[#0077B5] hover:text-white rounded-[1.5rem] border border-slate-100 flex items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Persistent Registration Link */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-6">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 flex items-center justify-between gap-6 animate-bounce-slow">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-4">Limited Seats Notice</p>
                    <Link href="#register" className="bg-[#002d5b] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-colors">
                        {t.hero.cta_reg}
                    </Link>
                </div>
            </div>
        </div>
    );
}

function RegistrationForm({ language }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        institution: '',
        country: '',
        role: '',
        attendance_type: 'Physical',
        language: language
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/abuja-conference-2026/register', {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const t = {
        en: { name: "Full Name", email: "Email", inst: "Institution", country: "Country", role: "Role", type: "Attendance Type", submit: "Confirm Registration", success: "Registration Successful!" },
        fr: { name: "Nom Complet", email: "E-mail", inst: "Institution", country: "Pays", role: "Rôle", type: "Type de Participation", submit: "Confirmer l'inscription", success: "Inscription Réussie!" }
    }[language] || { name: "Full Name", email: "Email", inst: "Institution", country: "Country", role: "Role", type: "Attendance Type", submit: "Confirm Registration", success: "Registration Successful!" };

    if (wasSuccessful) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{t.success}</h3>
                <p className="text-slate-500 font-medium">We have received your registration. See you in Abuja!</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t.name}</label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold text-slate-800" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t.email}</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold text-slate-800" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t.inst}</label>
                    <input type="text" value={data.institution} onChange={e => setData('institution', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold text-slate-800" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t.country}</label>
                    <input type="text" value={data.country} onChange={e => setData('country', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold text-slate-800" required />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t.role}</label>
                    <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 focus:border-[#002d5b] outline-none transition-all font-bold text-slate-800 appearance-none cursor-pointer" required>
                        <option value="">Select Role</option>
                        <option value="Clinician">Clinician</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Student">Student</option>
                        <option value="Public Health Expert">Public Health Expert</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t.type}</label>
                    <div className="flex gap-2">
                        {['Physical', 'Virtual'].map(type => (
                            <button key={type} type="button" onClick={() => setData('attendance_type', type)} className={`flex-1 py-4 rounded-3xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${data.attendance_type === type ? 'bg-[#002d5b] text-white border-[#002d5b]' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <button type="submit" disabled={processing} className="w-full bg-emerald-500 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all transform hover:-translate-y-1 mt-4">
                {processing ? 'Processing...' : t.submit}
            </button>
        </form>
    );
}

const style = `
@keyframes bounce-slow {
    0%, 100% { transform: translateY(0) translateX(-50%); }
    50% { transform: translateY(-8px) translateX(-50%); }
}
.animate-bounce-slow {
    animation: bounce-slow 4s ease-in-out infinite;
}
`;
