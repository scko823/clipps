// update clipboard
export default `
mutation updateClipboard($id:ID!, $name:String){
   updateClipboard(id: $id, name:$name){
  	id
    name
	}
}`
