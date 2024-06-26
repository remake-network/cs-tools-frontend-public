const languageLibrary = {
  en: {
    forbidden_message: 'Forbidden - Access Denied',
    ticket_not_found: 'Ticket not found',
    support_embed_welcome_title: 'Welcome to the Support Channel!',
    support_embed_text: "below you can leave your questions or concerns about the game below, and one of our representatives will promptly assist you as soon as possible. \nWe kindly ask that you avoid mentioning anyone specifically and remain patient.\n\nEnsure that you have reviewed the support guidelines as well as our https://discord.com/channels/1184231203994345594/1192508717237809254\n\nIf this is a player report or contains confidential information, please click the '**Mark as Sensitive Post**' button below.\n\nYou can close this post anytime by using the '**Close Post**' button below.\n\n**Please be patient, refrain from pinging anyone!**",
    support_button_closepost: "Close Post",
    support_button_privateticket: "Mark as Sensitive Ticket",
    support_button_guidelines: "Support Guidelines",
    support_button_cstools: "CS Tools",

    handleSupportForm_existingtTicket_text2: "Click [here](https://discord.com/channels/{interaction.guild.id}/{existingTicket.ChannelID}) to go to your existing {formTitle} support ticket.",
    handleSupportForm_existingtTicket_text1: "You already have an open {formTitle} support ticket. {existingTicketLink}",
    handleSupportForm_question_username: "What's your account username?",
    handleSupportForm_question_email: "What's your account email?",
    handleSupportForm_question_issue: "Describe the issue (max 45 characters)",

    ticketDeletion_title_embed: "Ticket Deletion",
    ticketDeletion_already_deleted_description_embed: "This ticket is already being deleted!",
    ticketDeletion_being_deleted_description_embed: "This ticket will be deleted in 5 seconds.",
    ticketDeletion_failed_error_embed: "Failed to delete the channel.",

    handleCSTicketInfo_forbidden_title_embed: "You're not allowed to use this button",
    handleCSTicketInfo_forbidden_description_embed: "Only a Customer Support Representative can see ticket information!",
    handleCSTicketInfo_information_title_embed: "Ticket Information",
    handleCSTicketInfo_information_field_username_embed: "Account Username",
    handleCSTicketInfo_information_field_email_embed: "Account Email",
    handleCSTicketInfo_information_field_issue_embed: "Issue",
    handleCSTicketInfo_api_error_embed: "Failed to receive ticket information for ticket {ticketID} from the API!",
    handleCSTicketInfo_information_credits_embed: "CS Tools were developed by Mikael",

    handleCloseTicket_ticketNotFoundDB_embed: "Ticket not found in the database",
    handleCloseTicket_alreadyDeleted_embed: "This ticket is already marked for deletion or has been closed.",
    handleCloseTicket_button_transcript_button: "Transcript",
    handleCloseTicket_button_open_button: "Open",
    handleCloseTicket_button_delete_button: "Delete",
    handleCloseTicket_ticketClosedBy_embed: "Ticket has been closed by {UserID}",
    handleCloseTicket_ticketClosed_embed: "Ticket closed",
    handleCloseTicket_errorHandleClosure_embed: "There was an error handling the ticket closure.",

    handleOpenTicket_existingTicket_Embed: "Existing Support Ticket",
    handleOpenTicket_existingTicket_description_Embed: "You already have an open pending support ticket.",
    handleOpenTicket_goToTicket_Embed: "Go to Ticket",
    handleOpenTicket_ticketCreated_Embed: "Ticket Created!",
    handleOpenTicket_selectCategory_Embed: "Please select your support category.",
    handleOpenTicket_ticketCreated_description_Embed: "Your ticket was created: https://discord.com/channels/{guild.id}/{textChannel.id}",
    handleOpenTicket_ticketCreatedDescription_Embed: "Please click the button corresponding to the game you need support for:\n\n1. **ToyShooters**\n2. **Football-Legend**\n3. **Remake Network Issues**\n\nClick the appropriate button below to get assistance \n\n*Note: Tickets are not forwarded to the correct support team until you do.*",
    handleOpenTicket_ticketCreated_label_ToyShooters_Embed: "ToyShooters",
    handleOpenTicket_ticketCreated_label_FootballLegend_Embed: "Football Legend",
    handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed: "Remake Network",
    handleOpenTicket_apiError_NotCreated_Embed: "There was an error creating your ticket. Please try again.",
    handleOpenTicket_apiError_unKnownResponse_Embed: "There was an unexpected issue creating your ticket. Please try again.",
    handleOpenTicket_apiError_ErrorCreating_Embed: "There was an error creating your ticket. Please try again later.",
    handleOpenTicket_apiError_ErrorCheckingExistingTicket_Embed: "There was an error checking for an existing ticket. Please try again later.",
    handleOpenTicket_apiError_ErrorOpenTicket: "There was an error processing your ticket request.",

    handleSupportForm_title_SupportForm_embed: "{formTitle} Support Form",
    handleSupportForm_description_SupportForm_embed: "Hi {ticketUser}, Your ticket has been forwarded to the {formTitle} Support Team and will be addressed shortly. \n\nEnsure that you have reviewed the support guidelines\n\nYou can close this post anytime by using the '**Close Ticket**' button below.\n\n**Please be patient, refrain from pinging anyone!**",
    handleSupportForm_sentMessage_labelClose_embed: "Close Ticket",
    handleSupportForm_sentMessage_labelSupportGuidelines_embed: "Support Guidelines",
    handleSupportForm_sentMessage_responsetimeNotice_embed: "Response Time Notice",
    handleSupportForm_sentMessage_responseTimeDescription_embed: "Response time may be delayed as there are currently no {formTitle} support agents online to assist you. Please be patient.",


  },
  tr: {
    forbidden_message: 'Yasak - Erişim Reddedildi',
    ticket_not_found: 'Bilet bulunamadı',
    support_embed_welcome_title: 'Destek Kanalına Hoş Geldiniz!',
    support_embed_text: "aşağıda oyunla ilgili sorularınızı veya endişelerinizi bırakabilirsiniz ve temsilcilerimizden biri en kısa sürede size yardımcı olacaktır.\nHerhangi birini özellikle belirtmekten kaçınmanızı ve sabırlı olmanızı rica ederiz.\n\nDestek yönergelerini ve şu adresdeki https://discord.com/channels/1184231203994345594/1192508717237809254 adresindeki kurallarımızı gözden geçirdiğinizden emin olun.\n\nBu bir oyuncu raporuysa veya gizli bilgiler içeriyorsa lütfen aşağıdaki '**Duyarlı Gönderi Olarak İşaretle**' düğmesine tıklayın.\n\nBu gönderiyi '**Gönderiyi Kapat**' düğmesini kullanarak istediğiniz zaman kapatabilirsiniz.\n\n**Lütfen sabırlı olun, kimseyi etiketlemekten kaçının!**",
    support_button_closepost: "Gönderiyi Kapat",
    support_button_privateticket: "Duyarlı Bilet Olarak İşaretle",
    support_button_guidelines: "Destek Kuralları",
    support_button_cstools: "Müşteri Hizmetleri Araçları",

    handleSupportForm_existingtTicket_text2: "Mevcut {formTitle} destek biletinize gitmek için [buraya](https://discord.com/channels/{interaction.guild.id}/{existingTicket.ChannelID}) tıklayın.",
    handleSupportForm_existingtTicket_text1: "Zaten açık bir {formTitle} destek biletiniz var. {existingTicketLink}",
    handleSupportForm_question_username: "Hesap kullanıcı adınız nedir?",
    handleSupportForm_question_email: "Hesap e-postanız nedir?",
    handleSupportForm_question_issue: "Sorunu açıklayın (maksimum 45 karakter)",

    ticketDeletion_title_embed: "Bilet Silme",
    ticketDeletion_already_deleted_description_embed: "Bu bilet zaten siliniyor!",
    ticketDeletion_being_deleted_description_embed: "Bu bilet 5 saniye içinde silinecek.",
    ticketDeletion_failed_error_embed: "Kanal silinemedi.",

    handleCSTicketInfo_forbidden_title_embed: "Bu düğmeyi kullanma izniniz yok",
    handleCSTicketInfo_forbidden_description_embed: "Yalnızca Müşteri Hizmetleri Temsilcisi bilet bilgilerini görebilir!",
    handleCSTicketInfo_information_title_embed: "Bilet Bilgisi",
    handleCSTicketInfo_information_field_username_embed: "Hesap Kullanıcı Adı",
    handleCSTicketInfo_information_field_email_embed: "Hesap E-postası",
    handleCSTicketInfo_information_field_issue_embed: "Sorun",
    handleCSTicketInfo_api_error_embed: "API'den {ticketID} numaralı bilet bilgisi alınamadı!",
    handleCSTicketInfo_information_credits_embed: "Müşteri Hizmetleri Araçları Mikael tarafından geliştirildi",

    handleCloseTicket_ticketNotFoundDB_embed: "Veritabanında bilet bulunamadı",
    handleCloseTicket_alreadyDeleted_embed: "Bu bilet zaten silinmek üzere işaretlendi veya kapatıldı.",
    handleCloseTicket_button_transcript_button: "Transkript",
    handleCloseTicket_button_open_button: "Aç",
    handleCloseTicket_button_delete_button: "Sil",
    handleCloseTicket_ticketClosedBy_embed: "Bilet {UserID} tarafından kapatıldı",
    handleCloseTicket_ticketClosed_embed: "Bilet kapatıldı",
    handleCloseTicket_errorHandleClosure_embed: "Bilet kapatma işlemi sırasında bir hata oluştu.",

    handleOpenTicket_existingTicket_Embed: "Mevcut Destek Bileti",
    handleOpenTicket_existingTicket_description_Embed: "Zaten bekleyen bir destek bileti açık.",
    handleOpenTicket_goToTicket_Embed: "Bilete Git",
    handleOpenTicket_ticketCreated_Embed: "Bilet Oluşturuldu!",
    handleOpenTicket_selectCategory_Embed: "Lütfen destek kategorinizi seçin.",
    handleOpenTicket_ticketCreated_description_Embed: "Biletiniz oluşturuldu: https://discord.com/channels/{guild.id}/{textChannel.id}",
    handleOpenTicket_ticketCreatedDescription_Embed: "Lütfen destek almanız gereken oyunu belirten düğmeyi tıklayın:\n\n1. **ToyShooters**\n2. **Football-Legend**\n3. **Remake Network Issues**\n\nYardım almak için uygun düğmeye tıklayın\n\n*Not: Biletler doğru destek ekibine iletilene kadar bekler.*",
    handleOpenTicket_ticketCreated_label_ToyShooters_Embed: "ToyShooters",
    handleOpenTicket_ticketCreated_label_FootballLegend_Embed: "Football Legend",
    handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed: "Remake Network",
    handleOpenTicket_apiError_NotCreated_Embed: "Bilet oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
    handleOpenTicket_apiError_unKnownResponse_Embed: "Bilet oluşturulurken beklenmeyen bir sorun oluştu. Lütfen tekrar deneyin.",
    handleOpenTicket_apiError_ErrorCreating_Embed: "Bilet oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    handleOpenTicket_apiError_ErrorCheckingExistingTicket_Embed: "Mevcut bilet kontrol edilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    handleOpenTicket_apiError_ErrorOpenTicket: "Bilet isteğiniz işlenirken bir hata oluştu.",

    handleSupportForm_title_SupportForm_embed: "{formTitle} Destek Formu",
    handleSupportForm_description_SupportForm_embed: "Merhaba {ticketUser}, Biletiniz {formTitle} Destek Ekibine iletilmiştir ve yakında ele alınacaktır.\n\nDestek yönergelerini gözden geçirdiğinizden emin olun\n\nBu gönderiyi istediğiniz zaman '**Bileti Kapat**' düğmesini kullanarak kapatabilirsiniz.\n\n**Lütfen sabırlı olun, kimseyi etiketlemekten kaçının!**",
    handleSupportForm_sentMessage_labelClose_embed: "Bileti Kapat",
    handleSupportForm_sentMessage_labelSupportGuidelines_embed: "Destek Kuralları",
    handleSupportForm_sentMessage_responsetimeNotice_embed: "Yanıt Süresi Bildirimi",
    handleSupportForm_sentMessage_responseTimeDescription_embed: "Şu anda size yardımcı olacak herhangi bir {formTitle} destek temsilcisi olmadığı için yanıt süresi gecikebilir. Lütfen sabırlı olun.",
},
  fr: {
    forbidden_message: 'Interdit - Accès refusé',
    ticket_not_found: 'Ticket introuvable',
    support_embed_welcome_title: 'Bienvenue sur le canal de support !',
    support_embed_text: "ci-dessous, vous pouvez poser vos questions ou exprimer vos préoccupations concernant le jeu, et l'un de nos représentants vous assistera rapidement dès que possible. \nNous vous demandons gentiment d'éviter de mentionner quelqu'un spécifiquement et de rester patient.\n\nAssurez-vous d'avoir examiné les directives de support ainsi que notre https://discord.com/channels/1184231203994345594/1192508717237809254\n\nS'il s'agit d'un signalement de joueur ou contient des informations confidentielles, veuillez cliquer sur le bouton '**Marquer comme message sensible**' ci-dessous.\n\nVous pouvez fermer ce message à tout moment en utilisant le bouton '**Fermer le message**' ci-dessous.\n\n**S'il vous plaît, soyez patient, évitez de mentionner qui que ce soit !**",
    support_button_closepost: "Fermer le message",
    support_button_privateticket: "Marquer comme Ticket Sensible",
    support_button_guidelines: "Directives de support",
    support_button_cstools: "Outils de service client",

    handleSupportForm_existingtTicket_text2: "Cliquez [ici](https://discord.com/channels/{interaction.guild.id}/{existingTicket.ChannelID}) pour accéder à votre ticket de support {formTitle} existant.",
    handleSupportForm_existingtTicket_text1: "Vous avez déjà un ticket de support {formTitle} ouvert. {existingTicketLink}",
    handleSupportForm_question_username: "Quel est le nom d'utilisateur de votre compte ?",
    handleSupportForm_question_email: "Quel est l'email de votre compte ?",
    handleSupportForm_question_issue: "Décrivez le problème (max 45 caractères)",

    ticketDeletion_title_embed: "Suppression de ticket",
    ticketDeletion_already_deleted_description_embed: "Ce ticket est déjà en cours de suppression !",
    ticketDeletion_being_deleted_description_embed: "Ce ticket sera supprimé dans 5 secondes.",
    ticketDeletion_failed_error_embed: "Échec de la suppression du canal.",

    handleCSTicketInfo_forbidden_title_embed: "Vous n'êtes pas autorisé à utiliser ce bouton",
    handleCSTicketInfo_forbidden_description_embed: "Seul un représentant du service client peut voir les informations sur le ticket !",
    handleCSTicketInfo_information_title_embed: "Informations sur le ticket",
    handleCSTicketInfo_information_field_username_embed: "Nom d'utilisateur du compte",
    handleCSTicketInfo_information_field_email_embed: "Email du compte",
    handleCSTicketInfo_information_field_issue_embed: "Problème",
    handleCSTicketInfo_api_error_embed: "Impossible de recevoir les informations sur le ticket {ticketID} à partir de l'API !",
    handleCSTicketInfo_information_credits_embed: "Les outils de service client ont été développés par Mikael",

    handleCloseTicket_ticketNotFoundDB_embed: "Ticket non trouvé dans la base de données",
    handleCloseTicket_alreadyDeleted_embed: "Ce ticket est déjà marqué pour suppression ou a été fermé.",
    handleCloseTicket_button_transcript_button: "Transcription",
    handleCloseTicket_button_open_button: "Ouvrir",
    handleCloseTicket_button_delete_button: "Supprimer",
    handleCloseTicket_ticketClosedBy_embed: "Ticket fermé par {UserID}",
    handleCloseTicket_ticketClosed_embed: "Ticket fermé",
    handleCloseTicket_errorHandleClosure_embed: "Une erreur s'est produite lors de la gestion de la fermeture du ticket.",

    handleOpenTicket_existingTicket_Embed: "Ticket de support existant",
    handleOpenTicket_existingTicket_description_Embed: "Vous avez déjà un ticket de support en attente ouvert.",
    handleOpenTicket_goToTicket_Embed: "Aller au ticket",
    handleOpenTicket_ticketCreated_Embed: "Ticket créé !",
    handleOpenTicket_selectCategory_Embed: "Veuillez sélectionner votre catégorie de support.",
    handleOpenTicket_ticketCreated_description_Embed: "Votre ticket a été créé : https://discord.com/channels/{guild.id}/{textChannel.id}",
    handleOpenTicket_ticketCreatedDescription_Embed: "Veuillez cliquer sur le bouton correspondant au jeu pour lequel vous avez besoin d'assistance :\n\n1. **ToyShooters**\n2. **Football-Legend**\n3. **Problèmes de Remake Network**\n\nCliquez sur le bouton approprié ci-dessous pour obtenir de l'aide \n\n*Remarque : Les tickets ne sont pas transmis à l'équipe de support correcte avant que vous ne le fassiez.*",
    handleOpenTicket_ticketCreated_label_ToyShooters_Embed: "ToyShooters",
    handleOpenTicket_ticketCreated_label_FootballLegend_Embed: "Football Legend",
    handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed: "Remake Network",
    handleOpenTicket_apiError_NotCreated_Embed: "Une erreur s'est produite lors de la création de votre ticket. Veuillez réessayer.",
    handleOpenTicket_apiError_unKnownResponse_Embed: "Un problème inattendu est survenu lors de la création de votre ticket. Veuillez réessayer.",
    handleOpenTicket_apiError_ErrorCreating_Embed: "Une erreur s'est produite lors de la création de votre ticket. Veuillez réessayer ultérieurement.",
    handleOpenTicket_apiError_ErrorCheckingExistingTicket_Embed: "Une erreur s'est produite lors de la vérification d'un ticket existant. Veuillez réessayer ultérieurement.",
    handleOpenTicket_apiError_ErrorOpenTicket: "Une erreur s'est produite lors du traitement de votre demande de ticket.",

    handleSupportForm_title_SupportForm_embed: "Formulaire de support {formTitle}",
    handleSupportForm_description_SupportForm_embed: "Salut {ticketUser}, Votre ticket a été transmis à l'équipe de support {formTitle} et sera traité sous peu. \n\nAssurez-vous d'avoir examiné les directives de support\n\nVous pouvez fermer ce message à tout moment en utilisant le bouton '**Fermer le ticket**' ci-dessous.\n\n**S'il vous plaît, soyez patient, évitez de mentionner qui que ce soit !**",
    handleSupportForm_sentMessage_labelClose_embed: "Fermer le ticket",
    handleSupportForm_sentMessage_labelSupportGuidelines_embed: "Directives de support",
    handleSupportForm_sentMessage_responsetimeNotice_embed: "Avis de temps de réponse",
    handleSupportForm_sentMessage_responseTimeDescription_embed: "Le temps de réponse peut être retardé car il n'y a actuellement aucun agent de support {formTitle} en ligne pour vous aider. Veuillez être patient.",
  },
  ro: {
    forbidden_message: 'Interzis - Acces-ul Interzis',
    ticket_not_found: 'Tichet-ul de support nu a fost găsit',
    support_embed_welcome_title: 'Bine ați venit în canalul de suport!',
    support_embed_text: "mai jos puteți lăsa întrebările sau nelămuririle legate de joc, iar unul dintre reprezentanții noștri vă vor ajuta prompt cât mai curând posibil. \nVă rugăm să evitați să menționați pe cineva în mod specific și să rămâneți răbdători.\n\nAsigurați-vă că ați revizuit ghidurile de suport, precum și https://discord.com/channels/1184231203994345594/1192508717237809254\n\nDacă acesta este un raport de jucător sau conține informații confidențiale, vă rugăm să faceți clic pe butonul '**Marchează ca Mesaj Sensibil**' de mai jos.\n\nPuteți închide acest tichet oricând folosind butonul '**Închide Tichet**' de mai jos.\n\n**Vă rugăm să aveți răbdare, abțineți-vă să menționați pe cineva!**",
    support_button_closepost: "Închide Tichet",
    support_button_privateticket: "Marchează ca Tichet privat.",
    support_button_guidelines: "Ghiduri de Suport",
    support_button_cstools: "Instrumente CS",

    handleSupportForm_existingtTicket_text2: "Faceți clic [aici](https://discord.com/channels/{interaction.guild.id}/{existingTicket.ChannelID}) pentru a merge la tichetul dvs. de suport existent {formTitle}.",
    handleSupportForm_existingtTicket_text1: "Aveți deja un tichet de suport {formTitle} deschis. {existingTicketLink}",
    handleSupportForm_question_username: "Care este numele de utilizator al contului dvs.?",
    handleSupportForm_question_email: "Care este adresa de email a contului dvs.?",
    handleSupportForm_question_issue: "Descrieți problema (maxim 45 de caractere)",

    ticketDeletion_title_embed: "Ștergere tichet",
    ticketDeletion_already_deleted_description_embed: "Acest tichet este deja în curs de ștergere!",
    ticketDeletion_being_deleted_description_embed: "Acest tichet va fi șters în 5 secunde.",
    ticketDeletion_failed_error_embed: "Eroare la ștergerea canalului.",

    handleCSTicketInfo_forbidden_title_embed: "Nu aveți voie să folosiți acest buton",
    handleCSTicketInfo_forbidden_description_embed: "Doar un Reprezentant de Suport pentru Clienți poate vedea informațiile despre tichet!",
    handleCSTicketInfo_information_title_embed: "Informații despre tichet",
    handleCSTicketInfo_information_field_username_embed: "Numele de Utilizator al Contului",
    handleCSTicketInfo_information_field_email_embed: "Email-ul Contului",
    handleCSTicketInfo_information_field_issue_embed: "Problemă",
    handleCSTicketInfo_api_error_embed: "Eroare la primirea informațiilor despre tichetul {ticketID} de la API!",
    handleCSTicketInfo_information_credits_embed: "Instrumentele CS au fost dezvoltate de Mikael",

    handleCloseTicket_ticketNotFoundDB_embed: "tichetul nu a fost găsit în baza de date",
    handleCloseTicket_alreadyDeleted_embed: "Acest tichet este deja marcat pentru ștergere sau a fost închis.",
    handleCloseTicket_button_transcript_button: "Transcript",
    handleCloseTicket_button_open_button: "Deschide",
    handleCloseTicket_button_delete_button: "Șterge",
    handleCloseTicket_ticketClosedBy_embed: "tichetul a fost închis de {UserID}",
    handleCloseTicket_ticketClosed_embed: "tichet închis",
    handleCloseTicket_errorHandleClosure_embed: "A fost o eroare în gestionarea închiderii tichetului.",

    handleOpenTicket_existingTicket_Embed: "tichet de Suport Există",
    handleOpenTicket_existingTicket_description_Embed: "Aveți deja un tichet de suport în așteptare deschis.",
    handleOpenTicket_goToTicket_Embed: "Mergi la tichet",
    handleOpenTicket_ticketCreated_Embed: "Tichet Creat!",
    handleOpenTicket_selectCategory_Embed: "Vă rugăm să selectați categoria de suport.",
    handleOpenTicket_ticketCreated_description_Embed: "tichetul dvs. a fost creat: https://discord.com/channels/{guild.id}/{textChannel.id}",
    handleOpenTicket_ticketCreatedDescription_Embed: "Vă rugăm să faceți clic pe butonul corespunzător jocului pentru care aveți nevoie de suport:\n\n1. **ToyShooters**\n2. **Football-Legend**\n3. **Remake Network Issues**\n\nFaceți clic pe butonul corespunzător pentru a obține asistență \n\n*Notă: tichetele nu sunt redirecționate către echipa corectă de suport până când nu faceți acest lucru.*",
    handleOpenTicket_ticketCreated_label_ToyShooters_Embed: "ToyShooters",
    handleOpenTicket_ticketCreated_label_FootballLegend_Embed: "Football Legend",
    handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed: "Remake Network",
    handleOpenTicket_apiError_NotCreated_Embed: "A fost o eroare la crearea tichetului dvs. Vă rugăm să încercați din nou.",
    handleOpenTicket_apiError_unKnownResponse_Embed: "A fost o problemă neașteptată la crearea tichetului dvs. Vă rugăm să încercați din nou.",
    handleOpenTicket_apiError_ErrorCreating_Embed: "A fost o eroare la crearea tichetului dvs. Vă rugăm să încercați din nou mai târziu.",
    handleOpenTicket_apiError_ErrorCheckingExistingTicket_Embed: "A fost o eroare la verificarea unui tichet existent. Vă rugăm să încercați din nou mai târziu.",
    handleOpenTicket_apiError_ErrorOpenTicket: "A fost o eroare la procesarea cererii dvs. de tichet.",

    handleSupportForm_title_SupportForm_embed: "Formular de Suport {formTitle}",
    handleSupportForm_description_SupportForm_embed: "Salut {ticketUser}, tichetul dvs. a fost trimis echipei de suport {formTitle} și va fi adresat în curând. \n\nAsigurați-vă că ați revizuit ghidurile de suport\n\nPuteți închide acest tichet oricând folosind butonul '**Închide tichetul**' de mai jos.\n\n**Vă rugăm să aveți răbdare, abțineți-vă să menționați pe cineva!**",
    handleSupportForm_sentMessage_labelClose_embed: "Închide tichetul",
    handleSupportForm_sentMessage_labelSupportGuidelines_embed: "Ghiduri de Suport",
    handleSupportForm_sentMessage_responsetimeNotice_embed: "Notificare Timp de Răspuns",
    handleSupportForm_sentMessage_responseTimeDescription_embed: "Timpul de răspuns poate întârzia deoarece nu există în prezent agenți de suport {formTitle} online pentru a vă ajuta. Vă rugăm să aveți răbdare.",
  },
  pt_br: {
    forbidden_message: 'Proibido - Acesso Negado',
    ticket_not_found: 'Ticket não encontrado',
    support_embed_welcome_title: 'Bem-vindo ao Canal de Suporte!',
    support_embed_text: "abaixo você pode deixar suas perguntas ou preocupações sobre o jogo e um de nossos representantes o ajudará prontamente assim que possível. \nPedimos gentilmente que evite mencionar alguém especificamente e mantenha a paciência.\n\nCertifique-se de ter revisado as diretrizes de suporte, bem como nosso https://discord.com/channels/1184231203994345594/1192508717237809254\n\nSe isso for um relatório de jogador ou contiver informações confidenciais, clique no botão '**Marcar como Postagem Sensível**' abaixo.\n\nVocê pode fechar esta postagem a qualquer momento usando o botão '**Fechar Postagem**' abaixo.\n\n**Por favor, seja paciente, evite mencionar qualquer pessoa!**",
    support_button_closepost: "Fechar Postagem",
    support_button_privateticket: "Marcar como Ticket Sensível",
    support_button_guidelines: "Diretrizes de Suporte",
    support_button_cstools: "Ferramentas de CS",

    handleSupportForm_existingtTicket_text2: "Clique [aqui](https://discord.com/channels/{interaction.guild.id}/{existingTicket.ChannelID}) para ir ao seu ticket de suporte {formTitle} existente.",
    handleSupportForm_existingtTicket_text1: "Você já possui um ticket de suporte {formTitle} aberto. {existingTicketLink}",
    handleSupportForm_question_username: "Qual é o nome de usuário da sua conta?",
    handleSupportForm_question_email: "Qual é o email da sua conta?",
    handleSupportForm_question_issue: "Descreva o problema (máx. 45 caracteres)",

    ticketDeletion_title_embed: "Exclusão de Ticket",
    ticketDeletion_already_deleted_description_embed: "Este ticket já está sendo excluído!",
    ticketDeletion_being_deleted_description_embed: "Este ticket será excluído em 5 segundos.",
    ticketDeletion_failed_error_embed: "Falha ao excluir o canal.",

    handleCSTicketInfo_forbidden_title_embed: "Você não tem permissão para usar este botão",
    handleCSTicketInfo_forbidden_description_embed: "Apenas um Representante de Suporte ao Cliente pode ver informações do ticket!",
    handleCSTicketInfo_information_title_embed: "Informações do Ticket",
    handleCSTicketInfo_information_field_username_embed: "Nome de Usuário da Conta",
    handleCSTicketInfo_information_field_email_embed: "Email da Conta",
    handleCSTicketInfo_information_field_issue_embed: "Problema",
    handleCSTicketInfo_api_error_embed: "Falha ao receber informações do ticket {ticketID} do API!",
    handleCSTicketInfo_information_credits_embed: "As Ferramentas de CS foram desenvolvidas por Mikael",

    handleCloseTicket_ticketNotFoundDB_embed: "Ticket não encontrado no banco de dados",
    handleCloseTicket_alreadyDeleted_embed: "Este ticket já está marcado para exclusão ou foi fechado.",
    handleCloseTicket_button_transcript_button: "Transcrição",
    handleCloseTicket_button_open_button: "Abrir",
    handleCloseTicket_button_delete_button: "Excluir",
    handleCloseTicket_ticketClosedBy_embed: "Ticket foi fechado por {UserID}",
    handleCloseTicket_ticketClosed_embed: "Ticket fechado",
    handleCloseTicket_errorHandleClosure_embed: "Houve um erro ao lidar com o fechamento do ticket.",

    handleOpenTicket_existingTicket_Embed: "Ticket de Suporte Existente",
    handleOpenTicket_existingTicket_description_Embed: "Você já possui um ticket de suporte pendente aberto.",
    handleOpenTicket_goToTicket_Embed: "Ir para o Ticket",
    handleOpenTicket_ticketCreated_Embed: "Ticket Criado!",
    handleOpenTicket_selectCategory_Embed: "Por favor, selecione sua categoria de suporte.",
    handleOpenTicket_ticketCreated_description_Embed: "Seu ticket foi criado: https://discord.com/channels/{guild.id}/{textChannel.id}",
    handleOpenTicket_ticketCreatedDescription_Embed: "Por favor, clique no botão correspondente ao jogo que você precisa de suporte:\n\n1. **ToyShooters**\n2. **Football-Legend**\n3. **Problemas de Remake Network**\n\nClique no botão apropriado abaixo para obter assistência \n\n*Nota: Os tickets não são encaminhados para a equipe de suporte correta até você fazê-lo.*",
    handleOpenTicket_ticketCreated_label_ToyShooters_Embed: "ToyShooters",
    handleOpenTicket_ticketCreated_label_FootballLegend_Embed: "Football Legend",
    handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed: "Remake Network",
    handleOpenTicket_apiError_NotCreated_Embed: "Houve um erro ao criar seu ticket. Por favor, tente novamente.",
    handleOpenTicket_apiError_unKnownResponse_Embed: "Houve um problema inesperado ao criar seu ticket. Por favor, tente novamente.",
    handleOpenTicket_apiError_ErrorCreating_Embed: "Houve um erro ao criar seu ticket. Por favor, tente novamente mais tarde.",
    handleOpenTicket_apiError_ErrorCheckingExistingTicket_Embed: "Houve um erro ao verificar um ticket existente. Por favor, tente novamente mais tarde.",
    handleOpenTicket_apiError_ErrorOpenTicket: "Houve um erro ao processar sua solicitação de ticket.",

    handleSupportForm_title_SupportForm_embed: "Formulário de Suporte {formTitle}",
    handleSupportForm_description_SupportForm_embed: "Oi {ticketUser}, Seu ticket foi encaminhado para a Equipe de Suporte {formTitle} e será atendido em breve. \n\nCertifique-se de ter revisado as diretrizes de suporte\n\nVocê pode fechar este ticket a qualquer momento usando o botão '**Fechar Ticket**' abaixo.\n\n**Por favor, seja paciente, evite mencionar qualquer pessoa!**",
    handleSupportForm_sentMessage_labelClose_embed: "Fechar Ticket",
    handleSupportForm_sentMessage_labelSupportGuidelines_embed: "Diretrizes de Suporte",
    handleSupportForm_sentMessage_responsetimeNotice_embed: "Aviso de Tempo de Resposta",
    handleSupportForm_sentMessage_responseTimeDescription_embed: "O tempo de resposta pode ser atrasado, pois atualmente não há agentes de suporte {formTitle} online para ajudá-lo. Por favor, seja paciente.",
  },
  no: {
    support_embed_welcome_title: 'Velkommen til Support-kanalen!',
    support_embed_text: "Under kan du legge igjen spørsmål eller bekymringer om spillet, og en av våre representanter vil hjelpe deg så snart som mulig. \nVi ber deg vennligst unngå å nevne noen spesifikt og være tålmodig.\n\nSørg for at du har gjennomgått retningslinjene for støtte samt våre https://discord.com/channels/862793688127111198/1148291383329833051.\n\nHvis dette er en spillerapport eller inneholder konfidensiell informasjon, vennligst klikk på '**Merk som sensitiv post**'-knappen nedenfor.\n\nDu kan lukke dette innlegget når som helst ved å bruke '**Lukk innlegg**'-knappen nedenfor.\n\n**Vær tålmodig, unngå å tagge noen!**",
    support_button_closepost: "Lukk innlegg",
    support_button_privateticket: "Merk som sensitivt innlegg",
    support_button_guidelines: "Retningslinjene",
    support_button_cstools: "CS Verktøy",

    handleSupportForm_existingtTicket_text2: "Klikk [her](https://discord.com/channels/{interaction.guild.id}/{existingTicket.ChannelID}) for å gå til din eksisterende {formTitle} henvendelse.",
    handleSupportForm_existingtTicket_text1: "Du har allerede en åpen {formTitle} henvendelse. {existingTicketLink}",
    handleSupportForm_question_username: "Hva er brukernavnet ditt?",
    handleSupportForm_question_email: "Hva er e-postadressen din?",
    handleSupportForm_question_issue: "Beskriv problemet (maks 45 tegn)",

    ticketDeletion_title_embed: "Sletter henvendelsen",
    ticketDeletion_already_deleted_description_embed: "Denne henvendelsen blir allerede slettet!",
    ticketDeletion_being_deleted_description_embed: "Denne henvendelsen vil bli slettet om 5 sekunder.",
    ticketDeletion_failed_error_embed: "Klarte ikke å slette henvendelsen.",

    handleCSTicketInfo_forbidden_title_embed: "Du har ikke lov til å bruke denne knappen",
    handleCSTicketInfo_forbidden_description_embed: "Bare en kundestøtterepresentant kan se henvendelse information!",
    handleCSTicketInfo_information_title_embed: "Henvendelse Informasjon",
    handleCSTicketInfo_information_field_username_embed: "Brukernavn",
    handleCSTicketInfo_information_field_email_embed: "E-postadresse",
    handleCSTicketInfo_information_field_issue_embed: "Problem",
    handleCSTicketInfo_api_error_embed: "Klarte ikke å motta informasjon for henvendelse {ticketID} fra API-et!",
    handleCSTicketInfo_information_credits_embed: "CS Tools ble utviklet av Mikael",

    handleCloseTicket_ticketNotFoundDB_embed: "Henvendelsem ble ikke funnet i databasen",
    handleCloseTicket_alreadyDeleted_embed: "Denne henvendelsen er allerede markert for sletting eller er blitt lukket.",
    handleCloseTicket_button_transcript_button: "Transkript",
    handleCloseTicket_button_open_button: "Åpne",
    handleCloseTicket_button_delete_button: "Slett",
    handleCloseTicket_ticketClosedBy_embed: "Henvendelsen er blitt lukket av {UserID}",
    handleCloseTicket_ticketClosed_embed: "Henvendelsen er lukket",
    handleCloseTicket_errorHandleClosure_embed: "Det oppstod en feil ved håndtering av Henvendelsen lukkelse.",

    handleOpenTicket_existingTicket_Embed: "Eksisterende henvendelsen",
    handleOpenTicket_existingTicket_description_Embed: "Du har allerede en åpen ventende henvendelsen.",
    handleOpenTicket_goToTicket_Embed: "Gå til henvendelsen",
    handleOpenTicket_ticketCreated_Embed: "henvendelsen opprettet!",
    handleOpenTicket_ticketCreated_description_Embed: "henvendelsen din ble opprettet: https://discord.com/channels/{guild.id}/{textChannel.id}",
    handleOpenTicket_ticketCreatedDescription_Embed: "Vennligst klikk på knappen som samsvarer med spillet du trenger støtte for:\n\n1. **ToyShooters**\n2. **Football-Legend**\n3. **Remake Network Problemer**\n\nKlikk på riktig knapp nedenfor for å få hjelp \n\n*Merk: henvendelsen videresendes ikke til riktig supportteam før du gjør dette.*",
    handleOpenTicket_ticketCreated_label_ToyShooters_Embed: "ToyShooters",
    handleOpenTicket_ticketCreated_label_FootballLegend_Embed: "Football Legend",
    handleOpenTicket_ticketCreated_label_RemakeNetwork_Embed: "Remake Network",
    handleOpenTicket_apiError_NotCreated_Embed: "Det oppstod en feil ved opprettelsen av henvendelsen din. Vennligst prøv igjen.",
    handleOpenTicket_apiError_unKnownResponse_Embed: "Det oppstod en uventet feil ved opprettelsen av henvendelsen din. Vennligst prøv igjen.",
    handleOpenTicket_apiError_ErrorCreating_Embed: "Det oppstod en feil ved opprettelsen av henvendelsen din. Vennligst prøv igjen senere.",
    handleOpenTicket_apiError_ErrorCheckingExistingTicket_Embed: "Det oppstod en feil ved sjekking av eksisterende henvendelsen. Vennligst prøv igjen senere.",
    handleOpenTicket_apiError_ErrorOpenTicket: "Det oppstod en feil ved behandlingen av henvendelsen din.",

    handleSupportForm_title_SupportForm_embed: "{formTitle} - henvendelse",
    handleSupportForm_description_SupportForm_embed: "Hei {ticketUser}, Din henvendelsen har blitt sendt videre til {formTitle} Support Team og vil bli behandlet snart. \n\nSørg for at du har gjennomgått retningslinjene for brukerstøtte.\n\nDu kan lukke dette innlegget når som helst ved å bruke '**Lukk billett**'-knappen nedenfor.\n\n**Vær tålmodig, unngå å ping noen!**",
    handleSupportForm_sentMessage_labelClose_embed: "Lukk henvendelsen",
    handleSupportForm_sentMessage_labelSupportGuidelines_embed: "Retningslinjene",
    handleSupportForm_sentMessage_responsetimeNotice_embed: "Varsel om svartid",
    handleSupportForm_sentMessage_responseTimeDescription_embed: "Svartiden kan bli forsinket ettersom det for øyeblikket ikke er noen {formTitle} agent pålogget for å hjelpe deg. Vær tålmodig."

  },
};

module.exports = languageLibrary;