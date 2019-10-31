import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBannerPage } from './detail-banner.page';

describe('DetailBannerPage', () => {
  let component: DetailBannerPage;
  let fixture: ComponentFixture<DetailBannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
