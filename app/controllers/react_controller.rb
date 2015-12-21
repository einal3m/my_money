class ReactController < ApplicationController
  def index
    render file: 'public/bundle.html', layout: false
  end
end
