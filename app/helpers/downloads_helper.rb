module DownloadsHelper
  def download_for(district)
    langs = {
      es: "CAST",
      ca: "CAT"
    }

    lang = langs[I18n.locale]

    case district 
      when "1"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Ciutat-Vella-#{lang}.pdf"
      when "2"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Eixample-#{lang}.pdf"
      when "3"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Sants-Montjuic-#{lang}.pdf"
      when "4"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Les-Corts-#{lang}.pdf"
      when "5"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Sarria-#{lang}.pdf"
      when "6"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Gracia-#{lang}.pdf"
      when "7"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Horta-Guinardo-#{lang}.pdf"
      when "8"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Nou-Barris-#{lang}.pdf"
      when "9"  then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Sant-Andreu-#{lang}.pdf" 
      when "10" then "http://www.barcelona.cat/download/pam/#{I18n.locale}/PAD-Sant-Marti-#{lang}.pdf"
      else "http://www.barcelona.cat/download/pam/#{I18n.locale}/Document-PAM-2016.pdf"
    end
  end
end
