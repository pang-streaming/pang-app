
export interface PostResponse {
    status: string; 
    message: string;
    data: Post;
    timestamp: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    content: string;
    likes: number;
    nickname: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    liked: boolean;
    images?: string[]; 
  }



  export interface Pageable {
    unpaged: boolean;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: Sort;
  }
  
  export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  }
  
  export interface PostListData {
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    content: Post[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  