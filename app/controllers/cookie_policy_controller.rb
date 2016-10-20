class CookiePolicyController < ApplicationController
  include HasParticipatoryProcess
  skip_authorization_check

  def allow
    response.set_cookie 'decidim-barcelona-cc', {
      value: 'true',
      path: '/',
      expires: 1.year.from_now.utc
    }
    render nothing: true
  end

  def deny
    response.delete_cookie 'decidim-barcelona-cc'
    render nothing: true
  end
end
