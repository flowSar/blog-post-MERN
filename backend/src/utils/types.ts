export interface ErrorInterface {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export interface PostInterface {
  title: string;
  slug?: string;
  content: string;
  description: string;
  coverImage: string;
  author: string;
  category: string;
  isPublished: boolean;
  like: number;
  comment: number;
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
  role?: "user" | "admin";
  posts?: PostInterface[];
}

export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
}

export interface LoginRequestBody {
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  bio?: string;
  rememberme: true;
}

export interface CustomResponse extends Response {
  success: (params: {
    statusCode: number;
    data: unknown[];
    message: string;
  }) => Response;
  failure: (params: {
    statusCode: number;
    errors: unknown[];
    message: string;
  }) => Response;
}

export interface JwtPayloadInterface {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  bio: string;
  role: string;
  permissions: string[];
}
