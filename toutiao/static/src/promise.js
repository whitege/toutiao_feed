(function (global) {

	function Promise(processor) {

		this._status = 'pending';

		processor(
			res => {
				this._resolve(res);
			},
			() => {
				this._status = 'rejected';
			}
		);
	}

	Promise.prototype = {
		
		constructor: Promise,

		_taskCallback: function (value, processor, next) {
			var preResult = processor(value);
			if (preResult instanceof Promise) {
				preResult
					.then(res => next._resolve(res));
				return;
			}
			return next._resolve(preResult);
		},

		then: function (onFullfilled) {
			this.onFullfilled = onFullfilled;
			this.next = new Promise((resolve, reject) => {});

			if (this._status === 'fullfilled') {
				this._taskCallback(
					this.currentValue,
					this.onFullfilled,
					this.next
				);
			}
			return this.next;
		},

		_resolve: function _resolve(res) {
			this._status = 'fullfilled';
			this.currentValue = res;
			if (this.onFullfilled) {
				this._taskCallback(
					this.currentValue,
					this.onFullfilled,
					this.next
				);
			}
		}
	};

	global.Promise = Promise;

})(window);