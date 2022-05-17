import React from 'react';
import { ROOT_ROUTE } from '../utils/constants';

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error) {
    // Здесь можно отправлять данные в сервис сбора ошибок
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Упс... Произошла непредвиденная ошибка.
          <div><a href={ROOT_ROUTE}>Перейти на главную</a></div>
        </div>
      );
    }
    return this.props.children;
  }};