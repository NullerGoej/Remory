import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskInfoPage } from './task-info.page';

describe('TaskInfoPage', () => {
  let component: TaskInfoPage;
  let fixture: ComponentFixture<TaskInfoPage>;

<<<<<<< HEAD
  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaskInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
=======
  // beforeEach(async(() => {
  //   fixture = TestBed.createComponent(TaskInfoPage);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // }));
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
