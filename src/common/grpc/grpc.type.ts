import { Observable } from 'rxjs';

export interface DocumentService {
    searchDocument(searchDocument: SearchDocument): Observable<any>;
    findOneDocument(documentById: DocumentById): Observable<any>;
    createDocument(createDocument: CreateDocument): Observable<any>;
    updateDocument(updateDocument: CreateDocument): Observable<any>;
    deleteDocument(documentById: DocumentById): Observable<any>;
}

interface Document {
    id: string;
    title?: string;
    description?: string;
    author_name?: string;
    studio_name?: string;
    bio?: string;
    character_name?: string;
}

interface SearchDocument {
    index: string;
    search: string;
}

interface DocumentById {
    index: string
    id: string
}

interface CreateDocument {
    index: string
    id: string
    document: Document
}
