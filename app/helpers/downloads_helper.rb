module DownloadsHelper
  def download_for(district)
    case district 
      when "1"  then "http://www.barcelona.cat/download/pam/ca/PAD-Ciutat-Vella-CAT.pdf"
      when "2"  then "http://www.barcelona.cat/download/pam/ca/PAD-Eixample-CAT.pdf"
      when "3"  then "http://www.barcelona.cat/download/pam/ca/PAD-Sants-Montjuic-CAT.pdf"
      when "4"  then "http://www.barcelona.cat/download/pam/ca/PAD-Les-Corts-CAT.pdf"
      when "5"  then "http://www.barcelona.cat/download/pam/ca/PAD-Sarria-CAT.pdf"
      when "6"  then "http://www.barcelona.cat/download/pam/ca/PAD-Gracia-CAT.pdf"
      when "7"  then "http://www.barcelona.cat/download/pam/ca/PAD-Horta-Guinardo-CAT.pdf"
      when "8"  then "http://www.barcelona.cat/download/pam/ca/PAD-Nou-Barris-CAT.pdf"
      when "9"  then "http://www.barcelona.cat/download/pam/ca/PAD-Sant-Andreu-CAT.pdf" 
      when "10" then "http://www.barcelona.cat/download/pam/ca/PAD-Sant-Marti-CAT.pdf"
      else "http://www.barcelona.cat/download/pam/ca/Document-PAM-2016.pdf"
    end
  end
end
