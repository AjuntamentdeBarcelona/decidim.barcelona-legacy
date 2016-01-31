class CookiePolicyController < ApplicationController
  skip_authorization_check

  def allow
    response.set_cookie 'bcn-cc', {
      value: 'true',
      path: '/',
      expires: 1.year.from_now.utc
    }
    render nothing: true
  end

  def deny
    response.delete_cookie 'bcn-cc'
    render nothing: true
  end
end
