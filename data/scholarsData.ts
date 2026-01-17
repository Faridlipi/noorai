export interface Scholar {
  id: string;
  name: string;
  title: string;
  era: string;
  description: string;
  contributions: string[];
}

export const scholars: Scholar[] = [
  {
    id: 'imam-bukhari',
    name: 'Imam Al-Bukhari',
    title: 'The Leader of Believers in Hadith',
    era: '810 – 870 CE',
    description: 'Muhammad ibn Ismail al-Bukhari was a Persian Islamic scholar who authored the hadith collection known as Sahih al-Bukhari, regarded by Sunni Muslims as the most authentic (sahih) book after the Quran.',
    contributions: [
      'Authored Sahih al-Bukhari',
      'Established the science of Rijal (narrator criticism)',
      'Traveled thousands of miles to collect authentic narrations'
    ]
  },
  {
    id: 'imam-al-ghazali',
    name: 'Imam Al-Ghazali',
    title: 'Proof of Islam (Hujjat al-Islam)',
    era: '1058 – 1111 CE',
    description: 'Abu Hamid al-Ghazali was a preeminent Persian theologian, jurist, philosopher, and mystic. His work "The Revival of the Religious Sciences" (Ihya Ulum al-Din) is considered one of the greatest Islamic works primarily for its ability to bridge law and spirituality.',
    contributions: [
      'Authored Ihya Ulum al-Din',
      'Reconciled Sufism with Orthodox Islamic Law',
      'Critiqued Aristotelian philosophy in "The Incoherence of the Philosophers"'
    ]
  },
  {
    id: 'ibn-sina',
    name: 'Ibn Sina (Avicenna)',
    title: 'The Prince of Physicians',
    era: '980 – 1037 CE',
    description: 'Ibn Sina was a polymath who is regarded as one of the most significant physicians, astronomers, thinkers and writers of the Islamic Golden Age. He has been described as the father of early modern medicine.',
    contributions: [
      'Authored The Canon of Medicine',
      'Authored The Book of Healing',
      'Pioneered clinical trials and systematic experimentation'
    ]
  },
  {
    id: 'aisha-bint-abu-bakr',
    name: 'Aisha bint Abu Bakr',
    title: 'Mother of the Believers',
    era: '613 – 678 CE',
    description: 'Aisha (Radi Allahu Anha) was a scholar, jurist, and teacher. She is one of the foremost narrators of hadith and her rulings in jurisprudence are a foundation of Islamic law.',
    contributions: [
      'Narrated over 2,200 Hadith',
      'A primary authority on inheritance and poetry',
      'Teacher to many prominent Tabi\'in scholars'
    ]
  },
  {
    id: 'rabia-al-adawiyya',
    name: 'Rabia Al-Adawiyya',
    title: 'The Ascetic of Basra',
    era: '714 – 801 CE',
    description: 'Rabia was a female Muslim saint and Sufi mystic. She is known for her extreme virtue and piety, and for introducing the concept of Divine Love (Mahabbah) as the highest form of worship.',
    contributions: [
      'Pioneered the concept of Love for Allah for His own sake',
      'A central figure in the Sufi tradition',
      'Her poetry remains a spiritual guide for millions'
    ]
  },
  {
    id: 'imam-malik',
    name: 'Imam Malik ibn Anas',
    title: 'Imam of the Abode of Migration',
    era: '711 – 795 CE',
    description: 'Malik ibn Anas was a premier scholar of prophetic traditions and the founder of the Maliki school of jurisprudence. He famously refused to leave Medina, the city of the Prophet.',
    contributions: [
      'Authored Al-Muwatta (The Well-Trodden Path)',
      'Founder of the Maliki Madhhab',
      'Codified the practice (Amal) of the people of Medina'
    ]
  }
];
