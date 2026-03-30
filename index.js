import { createStore } from "./package/zustand.js"

const userStore = createStore((set, get) => ({
    name: "Li Hua",
    setName: (newName) => set({name: newName}),
    age: 1,
    setAge: () => set((state) => {age: state.age + 1}) 
}))

const unsubscribe = userStore.subscribe((state, prevState) => {
    console.log("Updated")
})

const state = userStore.getState()

// Print the status of the first time
console.log(state)

// Change the value of name
state.setName("Zhang San")

console.log(state.name)

// Remove subscription
unsubscribe()

// Trigger the update again
state.setAge()

console.log(state.age)