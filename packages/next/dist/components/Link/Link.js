"use strict";

exports.__esModule = true;
exports.Link = Link;

var _react = _interopRequireDefault(require("react"));

var _link = _interopRequireDefault(require("next/link"));

var _components = require("@gatsby-tv/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Link(props) {
  const {
    children,
    component: Component = _components.Link,
    href,
    $props = {}
  } = props;
  return /*#__PURE__*/_react.default.createElement(_link.default, {
    href: href,
    passHref: true
  }, /*#__PURE__*/_react.default.createElement(Component, $props, children));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL0xpbmsvTGluay50c3giXSwibmFtZXMiOlsiTGluayIsInByb3BzIiwiY2hpbGRyZW4iLCJjb21wb25lbnQiLCJDb21wb25lbnQiLCJHYXRzYnlMaW5rIiwiaHJlZiIsIiRwcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQVNPLFNBQVNBLElBQVQsQ0FBY0MsS0FBZCxFQUFvRDtBQUN6RCxRQUFNO0FBQ0pDLElBQUFBLFFBREk7QUFFSkMsSUFBQUEsU0FBUyxFQUFFQyxTQUFTLEdBQUdDLGdCQUZuQjtBQUdKQyxJQUFBQSxJQUhJO0FBSUpDLElBQUFBLE1BQU0sR0FBRztBQUpMLE1BS0ZOLEtBTEo7QUFPQSxzQkFDRSw2QkFBQyxhQUFEO0FBQVUsSUFBQSxJQUFJLEVBQUVLLElBQWhCO0FBQXNCLElBQUEsUUFBUTtBQUE5QixrQkFDRSw2QkFBQyxTQUFELEVBQWVDLE1BQWYsRUFBd0JMLFFBQXhCLENBREYsQ0FERjtBQUtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IE5leHRMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IExpbmsgYXMgR2F0c2J5TGluayB9IGZyb20gXCJAZ2F0c2J5LXR2L2NvbXBvbmVudHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMaW5rUHJvcHMge1xuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgaHJlZjogc3RyaW5nO1xuICBjb21wb25lbnQ/OiBSZWFjdC5GQzxhbnk+O1xuICAkcHJvcHM/OiBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMaW5rKHByb3BzOiBMaW5rUHJvcHMpOiBSZWFjdC5SZWFjdEVsZW1lbnQge1xuICBjb25zdCB7XG4gICAgY2hpbGRyZW4sXG4gICAgY29tcG9uZW50OiBDb21wb25lbnQgPSBHYXRzYnlMaW5rLFxuICAgIGhyZWYsXG4gICAgJHByb3BzID0ge30sXG4gIH0gPSBwcm9wcztcblxuICByZXR1cm4gKFxuICAgIDxOZXh0TGluayBocmVmPXtocmVmfSBwYXNzSHJlZj5cbiAgICAgIDxDb21wb25lbnQgey4uLiRwcm9wc30+e2NoaWxkcmVufTwvQ29tcG9uZW50PlxuICAgIDwvTmV4dExpbms+XG4gICk7XG59XG4iXX0=