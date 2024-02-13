import { Response, Router } from 'express';
import { Route } from '../route/route.interface.js';

export interface Controller {
  readonly rounter: Router
  addRoute(route: Route): void
  send<T>(res: Response, statusCode: number, data: T): void // 200 - Данные отправлены
  created<T>(res: Response, data: T): void // 201 - Успшеный ответ на Post запрос
  ok<T>(res: Response, statusCode: number, data: T): void // 200 - Успешный ответ от сервера
  noContent<T>(res: Response, statusCode: number, data: T): void // 404 - Документ не найден
  wrongData<T>(res: Response, statusCode: number, data: T): void // 400 - Переданы не все необходимые параметры
  notAuthorized<T>(res: Response, statusCode: number, data: T): void // 401 - Пользователь не авторизован
}
