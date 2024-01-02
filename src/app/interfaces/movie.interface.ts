export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    comments?: string[];
    isFavorite?: boolean;
    newComment?: string;
    isEditing: boolean;
    showComments: boolean;
  }