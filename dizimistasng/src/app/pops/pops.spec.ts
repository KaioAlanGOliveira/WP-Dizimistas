import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Pops } from "./pops";

describe("Pops", () => {
  let component: Pops;
  let fixture: ComponentFixture<Pops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pops],
    }).compileComponents();

    fixture = TestBed.createComponent(Pops);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
