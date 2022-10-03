export class Profile implements IProfile {
  public userId: number;
  public emailVerified: boolean;
  public name: string;
  public surname: string;
  public provider: Provider;
  public imageUrl?: string;
  public blocked: boolean;
  public isActive: boolean;
  public facebook?: string;
  public twitter?: string;
  public linkedin?: string;
  public instagram?: string;
  public dateOfBirth?: Date;
  public readonly createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(p: IProfile) {
    this.userId = p.userId;
    this.surname = p.surname;
    this.name = p.name;
    this.dateOfBirth = p.dateOfBirth;
    this.updatedAt = new Date();
    this.imageUrl = p.imageUrl;
    this.facebook = p.facebook;
    this.twitter = p.twitter;
    this.instagram = p.instagram;
    this.linkedin = p.linkedin;
    this.provider = p.provider || "local";
    this.isActive = p.isActive || true;
    this.blocked = p.blocked || false;
    this.emailVerified = p.emailVerified || false;
  }
}

export interface IProfile {
  userId: number;
  emailVerified: boolean;
  name: string;
  surname: string;
  provider: Provider;
  isActive: boolean;
  blocked: boolean;
  imageUrl?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  dateOfBirth?: Date;
  createdAt?: Date;
  updatedAt: Date;
}

type Provider = "apple" | "google" | "facebook" | "github" | "local";
