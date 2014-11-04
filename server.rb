require 'sinatra'
require 'querystring'
require 'net/http'
require 'uri'
require 'json'

get '/proxy' do
  url = params[:url]
  new_params = params.clone
  new_params.delete("url")
  new_query = QueryString.stringify(params)
  uri = URI.parse(url + '?' + new_query)

  # Shortcut
  response = Net::HTTP.get_response(uri)

  content_type :json
  response.body
end

get '/' do
  
end