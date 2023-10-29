export interface UserModel {
  id?:           number | string | any,
  name:          string,
  email:         string,
  password:      string,
  role:          number,
  permeation:    number[];
  phone:         Number,
  imageUrl:      string,
  description:   string;
  activestate:   Boolean;
  governorate:   string,
  city:          string,
  area:          string,
  floorNo:       string,
  streetNo:      string,
  buildingNo:    string,
  apartmentNo:   string,
  createdAt:     string,
  updatedAt:     string,
  showInWebsite: boolean,

  albumId: number,
  thumbnailUrl: string,
  title: string,
  url:  string,
}
