export interface ICategory {
    _id?: string;
    name: string;
    description: string;
    icon: string;
}
export interface ICategoryIcon extends ICategory {
    icon: FileList;
}