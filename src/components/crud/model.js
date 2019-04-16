class Model {
  constructor(model) {
    this.fields = model.fields
    this.name = model.name
  }

  toString( model ){
    return model.name
  }
}

export default Model
