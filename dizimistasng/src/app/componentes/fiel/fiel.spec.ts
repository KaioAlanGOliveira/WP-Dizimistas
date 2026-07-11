import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fiel } from './fiel';

describe('Fiel', () => {
  let component: Fiel;
  let fixture: ComponentFixture<Fiel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fiel],
    }).compileComponents();

    fixture = TestBed.createComponent(Fiel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
