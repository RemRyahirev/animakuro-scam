import { Observable } from 'rxjs';

export interface DocumentService {
    searchDocument(index: string, search: string): ResDocument[];
    findOneDocument(index: string, id: string): Observable<any>;
    createDocument(index: string, id: string, document: Document): Observable<any>;
    updateDocument(index: string, id: string, document: Document): Observable<any>;
    deleteDocument(index: string, id: string): Observable<any>;
}

interface Document {
    id: string;
    title: string;
    description: string;
}

interface ResDocument {
    id: string
    score: string
}
