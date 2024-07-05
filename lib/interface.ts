export interface studioName {
    name: string;
    heroImage: any;
}

export interface heroImage {
    heroImage: any;
    headerText: [];
    touch: string;
}

export interface projects {
    projectName: string;
    projectImage: any;
    projectSlug: string;
    projectClient: any;
    projectDescription: any;
    projectGallery: [any];
}

export interface about {
    aboutName: string;
    aboutSlug: string;
}

export interface blog {
    blogName: string;
    blogSlug: string;
}

export interface WhatInterface {
    name: string;
    text: any;
    disciplines: [any];
    field: object;
    fieldName: string;
    fieldText: any;
    info: any;
}


export interface selectedProjects {
    name: string;
    text: [any];
}
