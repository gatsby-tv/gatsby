"use strict";

exports.__esModule = true;
exports.useSubscriptionsFeed = useSubscriptionsFeed;

var _useInfinite2 = require("./use-infinite");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useSubscriptionsFeed(id) {
  const _useInfinite = (0, _useInfinite2.useInfinite)(index => id ? "/user/" + id + "/listing/subscriptions/random?page=" + index : null),
        {
    data
  } = _useInfinite,
        props = _objectWithoutPropertiesLoose(_useInfinite, ["data"]);

  return _extends({
    videos: data
  }, props);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi91dGlsaXRpZXMvdXNlLXN1YnNjcmlwdGlvbnMtZmVlZC50cyJdLCJuYW1lcyI6WyJ1c2VTdWJzY3JpcHRpb25zRmVlZCIsImlkIiwiaW5kZXgiLCJkYXRhIiwicHJvcHMiLCJ2aWRlb3MiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7Ozs7OztBQUdPLFNBQVNBLG9CQUFULENBQ0xDLEVBREssRUFFbUM7QUFDeEMsdUJBQTJCLCtCQUFvQkMsS0FBRCxJQUM1Q0QsRUFBRSxjQUFZQSxFQUFaLDJDQUFvREMsS0FBcEQsR0FBOEQsSUFEdkMsQ0FBM0I7QUFBQSxRQUFNO0FBQUVDLElBQUFBO0FBQUYsR0FBTjtBQUFBLFFBQWlCQyxLQUFqQjs7QUFJQTtBQUNFQyxJQUFBQSxNQUFNLEVBQUVGO0FBRFYsS0FFS0MsS0FGTDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlkZW8gfSBmcm9tIFwiQGdhdHNieS10di90eXBlc1wiO1xuXG5pbXBvcnQgeyB1c2VJbmZpbml0ZSB9IGZyb20gXCJAbGliL3V0aWxpdGllcy91c2UtaW5maW5pdGVcIjtcbmltcG9ydCB7IEluZmluaXRlRmV0Y2hSZXNwb25zZSB9IGZyb20gXCJAbGliL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdWJzY3JpcHRpb25zRmVlZChcbiAgaWQ/OiBzdHJpbmdcbik6IEluZmluaXRlRmV0Y2hSZXNwb25zZTxcInZpZGVvc1wiLCBWaWRlbz4ge1xuICBjb25zdCB7IGRhdGEsIC4uLnByb3BzIH0gPSB1c2VJbmZpbml0ZTxWaWRlbz4oKGluZGV4KSA9PlxuICAgIGlkID8gYC91c2VyLyR7aWR9L2xpc3Rpbmcvc3Vic2NyaXB0aW9ucy9yYW5kb20/cGFnZT0ke2luZGV4fWAgOiBudWxsXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICB2aWRlb3M6IGRhdGEsXG4gICAgLi4ucHJvcHMsXG4gIH07XG59XG4iXX0=