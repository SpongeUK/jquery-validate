(function ($) {
    function isTruthy(value) {
        return !!value;
    }

    function isNotEmpty() {
        return isTruthy($(this).val());
    }

    function isValidEmail() {
        var emailRegexStr = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$", "i");
        return emailRegexStr.test($(this).val());
    }

    function ValidatedUIControl(selector, check) {

        function ControlStateHandler($scope, $message, check) {
            return function changeControlState() {
                if(check.call(this)) {
                    $scope.removeClass('error');
                    $message.hide();
                    $scope.attr('data-valid', true);                    
                } else {
                    $scope.addClass('error');
                    $message.show();
                    $scope.attr('data-valid', false);
                }
            };
        }

        $(selector).each(function () {
            var $scope = $(this),
                $input = $('input, select', $scope),
                $message = $('.error-message', $scope);
            
            var handler = ControlStateHandler($scope, $message, check);
            $input.click(handler).focusout(handler);
            handler.call($input);
        });
    }
    
    $.fn.requiredFields = function() {
        ValidatedUIControl($('.required-input', this), isNotEmpty);
        ValidatedUIControl($('.required-email', this), isValidEmail);
        ValidatedUIControl($('.required-select', this), isNotEmpty);

        return !$('[class*=" required-"][data-valid=false]', this).length;
    };
})(jQuery);