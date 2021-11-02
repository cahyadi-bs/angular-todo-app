import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  
  todos:Todo[] = [];

  editActive = -1
  editText: string = ''

  constructor() { }

  ngOnInit(): void {
    this.todos = [
      {
        content: 'First todo',
        completed: false
      },
      {
        content: 'Second todo',
        completed: false
      }
    ]
  }


  toggleDone(id:number){
    this.todos.map((v,i) => {
      if (i == id) v.completed = !v.completed;
      console.log(v);
      return v;
    })
  }

  deleteTodo(id:number){
    this.todos = this.todos.filter((v,i) => i !== id);
  }

  
  addTodo(todo: Todo){
    this.todos.push(todo);
    this.alertWithSuccess();
  }

  activateEdit(index: number) {
    this.editActive = index
    this.editText = this.todos.find((v,i) => i === index)!.content
  }

  saveEdit() {
    this.todos[this.editActive].content = this.editText
    this.editActive = -1
  }

  confirmBox(id:number){  
    Swal.fire({  
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {  
      if (result.value) {  
        Swal.fire(  
          'Deleted!',  
          'Your todo has been deleted.',  
          'success',
        )
        this.deleteTodo(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your todo is safe :)',  
          'error'  
        )  
      }  
    })  
  }
  

  alertWithSuccess(){
    Swal.fire('Success', 'You added Todo succesfully!', 'success')
  }
}
