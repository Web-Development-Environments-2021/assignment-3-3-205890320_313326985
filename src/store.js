const state = {
  server_domain: "http://localhost:3000/",
  username: undefined,
  items: []

};

const actions = {
  addItem: () =>{
      state.items.push("newItem")
  }
}

export {state,actions}