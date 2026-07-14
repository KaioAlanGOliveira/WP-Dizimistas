import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PopPagamento } from "./popPagamento";

describe("PopPagamento", () => {
  let component: PopPagamento;
  let fixture: ComponentFixture<PopPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopPagamento],
    }).compileComponents();

    fixture = TestBed.createComponent(PopPagamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
