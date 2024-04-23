import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ProductService } from 'src/app/services/product.service';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
onAddProduct($event: any) {
throw new Error('Method not implemented.');
}

  task = '';
  todos:Todo[] = []

  products: any[] = [];
  showModal = false;
  OneProduct : any ={};

  DisplayAddModal=false;

  constructor(private appService :AppService,public productService: ProductService){

  }
  ngOnInit(): void {
    this.getList();
    this.getProduct(); 
  }

  getList() {
    this.appService.getTodoList().subscribe(response => {
      this.todos = response;
    });
  }

  updateTodo(completed: boolean,index : number)
  {
    this.todos[index].completed = completed;
    console.log(this.todos);
  }
  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
  addTodo()
  {
    this.todos.push()
    console.log('added',this.task);

    
  }
// product tsssssssssssssssssssssssssss

getProduct() {
  this.productService.getProducts().subscribe(
    (data) => {
      this.products = data;
   
    }
  );
}

showAddModal()
{
  this.DisplayAddModal=true;
}


}