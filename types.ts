
export interface SearchResponse {
  answer: string;
  sources: {
    title: string;
    uri: string;
  }[];
  isIslamic: boolean;
}

export interface Topic {
  id: string;
  title: string;
  category: 'Beliefs' | 'Practices' | 'History' | 'Law' | 'Science';
  content: string;
  historicalContext: string;
  comparison: string;
  faqs: { question: string; answer: string }[];
  imagePrompt: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  fullText: string;
  dateAdded: string;
}
