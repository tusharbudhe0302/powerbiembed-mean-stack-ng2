export interface IReports {
    id: string;
    name: string;
    embedUrl: string;
}
export interface IDashboards {
    id: string;
    displayName: string;
    embedUrl: string;
    isReadOnly: boolean;
}
export interface IWorkspaces {
    id: string;
    name: string;
}