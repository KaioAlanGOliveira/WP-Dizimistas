import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PopsPagamento } from "./pops-pagamento";

describe("PopsPagamento", () => {
  let component: PopsPagamento;
  let fixture: ComponentFixture<PopsPagamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopsPagamento],
    }).compileComponents();

    fixture = TestBed.createComponent(PopsPagamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
