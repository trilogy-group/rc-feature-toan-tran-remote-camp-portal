import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { DfSidebarModule } from '@devfactory/ngx-df/sidebar';

import { AuthenticationTokenService } from '../../shared/services/authentication-token.service';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let mockAuthenticationTokenService: jasmine.SpyObj<AuthenticationTokenService>;

  beforeEach(async(() => {
    mockAuthenticationTokenService = jasmine.createSpyObj(
      'AuthenticationTokenService', ['isUserAdmin', 'hasICStarted']);
    TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        DfSidebarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule
      ],
      providers: [
        { provide: AuthenticationTokenService, useValue: mockAuthenticationTokenService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should display rca menu item if not admin', () => {
    // Arrange
    mockAuthenticationTokenService.isUserAdmin.and.returnValue(false);
    mockAuthenticationTokenService.hasICStarted.and.returnValue(true);

    // Act
    fixture.detectChanges();

    // Assert
    const element: HTMLElement = fixture.nativeElement;
    const rcaItem = element.querySelector('a[href="/rca"]');
    expect(rcaItem).not.toBeNull();

  });

  it('should not display rca menu item if admin', () => {
    // Arrange
    mockAuthenticationTokenService.isUserAdmin.and.returnValue(true);
    mockAuthenticationTokenService.hasICStarted.and.returnValue(false);

    // Act
    fixture.detectChanges();

    // Assert
    const element: HTMLElement = fixture.nativeElement;
    const rcaItem = element.querySelector('a[href="/rca"]');
    expect(rcaItem).toBeNull();
  });
});
