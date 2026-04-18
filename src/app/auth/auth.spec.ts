import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

describe('Auth Component', () => {
  let component: Auth;
  let fixture: ComponentFixture<Auth>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auth, FormsModule, CommonModule],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Auth);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start in login mode', () => {
    expect(component.isLoginMode).toBe(true);
  });

  it('should toggle between login and register mode', () => {
    expect(component.isLoginMode).toBe(true);
    component.toggleMode();
    expect(component.isLoginMode).toBe(false);
    component.toggleMode();
    expect(component.isLoginMode).toBe(true);
  });

  it('should reset forms when toggling mode', () => {
    component.loginForm.email = 'test@email.com';
    component.loginForm.password = 'password123';
    component.toggleMode();
    expect(component.loginForm.email).toBe('');
    expect(component.loginForm.password).toBe('');
  });

  it('should not submit login form if email is empty', () => {
    spyOn(console, 'log');
    component.loginForm.email = '';
    component.loginForm.password = 'password123';
    component.onLogin();
    expect(console.log).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should not submit login form if password is empty', () => {
    spyOn(console, 'log');
    component.loginForm.email = 'test@email.com';
    component.loginForm.password = '';
    component.onLogin();
    expect(console.log).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should submit login form with valid data', () => {
    spyOn(console, 'log');
    component.loginForm.email = 'test@email.com';
    component.loginForm.password = 'password123';
    component.onLogin();
    expect(console.log).toHaveBeenCalledWith('Login Attempt:', {
      email: 'test@email.com',
      password: 'password123',
    });
  });

  it('should not submit register form if any field is empty', () => {
    spyOn(console, 'log');
    component.registerForm.fullName = 'John Doe';
    component.registerForm.email = 'test@email.com';
    component.registerForm.password = 'password123';
    component.registerForm.confirmPassword = '';
    component.onRegister();
    expect(console.log).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should not submit register form if passwords do not match', () => {
    spyOn(console, 'log');
    component.registerForm.fullName = 'John Doe';
    component.registerForm.email = 'test@email.com';
    component.registerForm.password = 'password123';
    component.registerForm.confirmPassword = 'password456';
    component.onRegister();
    expect(console.log).toHaveBeenCalledWith('Passwords do not match');
  });

  it('should submit register form with valid data', () => {
    spyOn(console, 'log');
    component.registerForm.fullName = 'John Doe';
    component.registerForm.email = 'test@email.com';
    component.registerForm.password = 'password123';
    component.registerForm.confirmPassword = 'password123';
    component.onRegister();
    expect(console.log).toHaveBeenCalledWith('Register Attempt:', {
      fullName: 'John Doe',
      email: 'test@email.com',
    });
  });

  it('should clear login form after successful submission', () => {
    component.loginForm.email = 'test@email.com';
    component.loginForm.password = 'password123';
    component.onLogin();
    expect(component.loginForm.email).toBe('');
    expect(component.loginForm.password).toBe('');
  });

  it('should clear register form after successful submission', () => {
    component.registerForm.fullName = 'John Doe';
    component.registerForm.email = 'test@email.com';
    component.registerForm.password = 'password123';
    component.registerForm.confirmPassword = 'password123';
    component.onRegister();
    expect(component.registerForm.fullName).toBe('');
    expect(component.registerForm.email).toBe('');
    expect(component.registerForm.password).toBe('');
    expect(component.registerForm.confirmPassword).toBe('');
  });
});
