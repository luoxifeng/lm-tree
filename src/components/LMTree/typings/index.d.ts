
export interface IModel {
    title?: string;
    name?: string;
    open?: boolean;
    active?: boolean;
    children?: IModel[];
}

export interface ISelect {
    level: string | number;
    select: IModel;
}