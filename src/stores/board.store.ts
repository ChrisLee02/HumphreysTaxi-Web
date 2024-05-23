import {create} from "zustand";

interface BoardStore {
    title: string;
    content: string;
    startingPoint: string;
    destinationPoint: string;
    departTime: string;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setStartingPoint: (startingPoint: string) => void;
    setDestinationPoint: (destinationPoint: string) => void;
    setDepartTime: (departTime: string) => void;
    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: "",
    content: "",
    startingPoint: "",
    destinationPoint: "",
    departTime: "",

    setTitle: (title) => set((state) => ({...state, title})),
    setContent: (content) => set((state) => ({...state, content})),
    setStartingPoint: (startingPoint: string) => set((state) => ({...state, startingPoint})),
    setDestinationPoint: (destinationPoint: string) => set((state) => ({...state, destinationPoint})),
    setDepartTime: (departTime: string) => set((state) => ({...state, departTime})),

    resetBoard: () =>
        set((state) => ({
            ...state,
            title: "",
            content: "",
            startingPoint: "",
            destinationPoint: "",
            departTime: "",
        })),
}));

export default useBoardStore;
