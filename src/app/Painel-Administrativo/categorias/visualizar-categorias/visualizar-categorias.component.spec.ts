import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCategoriasComponent } from './visualizar-categorias.component';

describe('VisualizarCategoriasComponent', () => {
  let component: VisualizarCategoriasComponent;
  let fixture: ComponentFixture<VisualizarCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
