//  A, B, C, D are services
let cServices1: string[] = ['A', 'B', 'C'];
let cServices2: string[] = ['B', 'C'];
let cServices3: string[] = ['C'];
let cServices4: string[] = ['B', 'D'];
let cServices5: string[] = ['C', 'D'];


export const getServices = (): string[] => {
    return [...cServices1, ...cServices2, ...cServices3, ...cServices4, ...cServices5];
};