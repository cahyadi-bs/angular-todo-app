import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit {
  @Output() newTodoEvent = new EventEmitter<Todo>();
  inputTodo:string = "";
  isSubmitted = false;
  error:any = {};

  todoForm = new FormGroup({
    taskName: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
    ])
  });

  
  constructor() {}

  ngOnInit(): void {
  }

  validateForm(){
    if(this.taskName?.errors)
      this.error.taskName = { ...this.taskName?.errors }
    else
      delete this.error.taskName
  }

  handlerTodoForm(){
    console.log(this.todoForm);
    this.handleIsSubmittedState(true);
    if(this.todoForm.status === "VALID"){
      this.addTodo(this.todoForm.value.taskName);
      //console.log(this.todoForm.value.taskName);
      this.todoForm.reset();
    } 
  }

  handleIsSubmittedState(state:boolean){
      this.isSubmitted = state;
  }

  get taskName(){
    return this.todoForm.get('taskName')
  }

  addTodo(todoItem : string){
    const todo:Todo = {
      content: todoItem,
      completed: false
    }
    this.newTodoEvent.emit(todo);
    this.handleIsSubmittedState(false);
  }
}
