					/* jQuery Floating Scrollbar - v0.4 - 02/28/2011 */
					  (function ($) { var win = $(this), html = $('html'), elems = $([]), current, previous, scroller = $('<div id="floating-scrollbar"><div/></div>'), scrollerInner = scroller.children(); scroller.hide().css({position: 'fixed', bottom: 0, height: '30px', overflowX: 'auto', overflowY: 'hidden'}).scroll(function () { current && current.scrollLeft(scroller.scrollLeft()); }); scrollerInner.css({border: '1px solid #fff', opacity: 0.01}); $.fn.floatingScrollbar = function (state) { if (state === false) { elems = elems.not(this); this.unbind('scroll', scrollCurrent); if (!elems.length) { scroller.detach(); win.unbind('resize scroll', update); } } else if (this.length) { if (!elems.length) { win.resize(update).scroll(update); } elems = elems.add(this); } update(); return this; }; $.floatingScrollbarUpdate = update; function setState(state) { scroller.toggle(!!state); } function scrollCurrent() { current && scroller.scrollLeft(current.scrollLeft()); } function update() { previous = current; current = null; elems.each(function () { var elem = $(this), top = elem.offset().top, bottom = top + elem.height(), viewportBottom = win.scrollTop() + win.height(), topOffset = 30; if (top + topOffset < viewportBottom && bottom > viewportBottom) { current = elem; return false; } }); if (!current) { setState(); return; } var scroll = current.scrollLeft(), scrollMax = current.scrollLeft(90019001).scrollLeft(), widthOuter = current.innerWidth(), widthInner = widthOuter + scrollMax; current.scrollLeft(scroll); if (widthInner <= widthOuter) { setState(); return; } setState(true); if (!previous || previous[0] !== current[0]) { previous && previous.unbind('scroll', scrollCurrent); current.scroll(scrollCurrent).after(scroller); } scroller.css({left: current.offset().left - win.scrollLeft(), width: widthOuter}).scrollLeft(scroll); scrollerInner.width(widthInner); } })(jQuery); $(function () { $('.sh .highlight, .sample').floatingScrollbar(); });
					
					/*STATS epikriisi näita kõik lingi script:ALGUS*/
					$(document).ready(function() {
						$('#show-all-hidden-link').on( 'click', function(){
							
								
								$text = $('#show-all-hidden-link b').attr('status_text').split(';');
								if($('#show-all-hidden-link b').text() == $text[0]){
									$('#show-all-hidden-link b').text($text[1]);
									$( '#print-version-all' ).removeClass( 'hide-in-browser');
									$( '.show-in-print' ).css( 'display', 'block' );
									
									$( '.show-cell-in-print' ).css( 'display', 'table-cell' );
									$('.regular-checkbox').attr('checked' , true);
									$( '.toggle-link' ).each(function( index ) {
									  $text = $(this).attr('status_text').split(';');
									  $(this).text($text[1]);
									});
										
								
								}else{
								$('#show-all-hidden-link b').text($text[0]);
									$( '#print-version-all' ).addClass( 'hide-in-browser');
									$( '.show-in-print' ).css( 'display', 'none' );
									$( '.show-cell-in-print' ).css( 'display', 'none' );
									$('.regular-checkbox').attr('checked' , false);
									
									$( '.toggle-link' ).each(function( index ) {
									  $text = $(this).attr('status_text').split(';');
									  $(this).text($text[0]);
									});
									
								}
								toggle_ref();
						});							
					});
					/*STATS epikriisi näita kõik lingi script:LÕPP*/
					
					/*Analüüsi tabeli skript:ALGUS*/
					function ajust_table_cells(){
					//td height
					$('#analysis-table tr').each(function(){
							var row_height = $( this ).height();
							var section_height = 0;
							for (i = 2; i < 5; i++) { 
								if(section_height < $( this ).children('td:nth-child('+i+')').children('section').height()){
									section_height = $( this ).children('td:nth-child('+i+')').children('section').height();
								}			
							}
							if(section_height+9 > row_height){
								$(this).children('td').height(section_height+10);
								$(this).children('td:nth-child(1)').height(section_height);
							}else{

								$( this).children('td:nth-child(n+5)').height(row_height-1);			
								$( this).children('td:nth-child(1)').height(row_height-11);			
								$( this).children('td:nth-child(2)').height(row_height-6);			
								$( this).children('td:nth-child(3)').height(row_height-6);			
								$( this).children('td:nth-child(4)').height(row_height-6);					
							}
						});	
					}

					function toggle_ref(){
						$text = $('#show-ref-link b').attr('status_text').split(';');
						if($('#show-ref-link b').text() == $text[0]){
							$('#show-ref-link b').text($text[1]);
							$('#analysis-table td:nth-child(4),#analysis-table th:nth-child(4)').css('display', 'table-cell');
							$('#analysis-table-container').css('width', '525px');
							$('#analysis-table-container').css('margin-left', '500px');	
							ajust_table_cells();
								
						}else{
							$('#show-ref-link b').text($text[0]);
							$('#analysis-table td:nth-child(4),#analysis-table th:nth-child(4)').css('display', 'none');
							$('#analysis-table-container').css('width', '698px');
							$('#analysis-table-container').css('margin-left', '327px');
							ajust_table_cells();
						}

					}

					function generate_table_ids(){
						var count=1;
						
						$('#analysis-table tbody tr').each(function(){
							$('#analysis-table tbody tr:nth-child('+count+') td input').attr('id', 'check-analysis-row-'+count);
							$('#analysis-table tbody tr:nth-child('+count+') td label').attr('for', 'check-analysis-row-'+count);
							count++;
						});
						var count=1;
						
						$('#analysis-table tbody tr:first-child td').each(function(){
							if(count > 4){
								$('#analysis-table  tr td:nth-child('+count+') input').attr('id', 'check-analysis-col-'+count);
								$('#analysis-table  tr td:nth-child('+count+') label').attr('for', 'check-analysis-col-'+count);		
							}
						count++;
						});	
					}

					$(document).ready(function() {
						generate_table_ids();
						$('.analysis-checkbox').attr('checked', true);
						$('.sample').floatingScrollbar();
						$('#analysis-table tbody td:nth-child(n + 2)').addClass( 'show-col-in-print' );
						$('#analysis-table thead th:nth-child(n + 2)').addClass( 'show-col-in-print' );
						$('#analysis-table tbody tr').addClass( 'show-row-in-print' );

						
						ajust_table_cells();
						//referents väärtus ja ühik
						$('#show-ref-link').on( 'click', function(){
							toggle_ref();
						});	
						
						$('#check-analysis-all-col').change(function(){	
							if(this.checked){
								$('#analysis-table thead tr:nth-child(1) td:nth-child(n+5) input').attr('checked', true);
								$('#analysis-table tbody td:nth-child(n+5),#analysis-table th:nth-child(n+5)').addClass( 'show-col-in-print' );
								$('#analysis-table tbody td:nth-child(n+5),#analysis-table th:nth-child(n+5)').removeClass( 'hide-col-in-print' );
							}
							if(!this.checked){
								$('#analysis-table thead tr:nth-child(1) td:nth-child(n+5) input').attr('checked', false);
								$('#analysis-table tbody  td:nth-child(n+5),#analysis-table th:nth-child(n+5)').removeClass( 'show-col-in-print' );
								$('#analysis-table tbody  td:nth-child(n+5),#analysis-table th:nth-child(n+5)').addClass( 'hide-col-in-print' );
							}		
						});
						$('#check-analysis-all-row').change(function(){
							if(this.checked){
								$('#analysis-table tbody tr:nth-child(n) td input').attr('checked', true);
								$('#analysis-table tbody tr').addClass( 'show-row-in-print' );
								$('#analysis-table tbody tr').removeClass( 'hide-row-in-print' );
							}
							if(!this.checked){
								$('#analysis-table tbody tr:nth-child(n) td input').attr('checked', false);
								$('#analysis-table tbody tr').removeClass( 'show-row-in-print' );
								$('#analysis-table tbody tr').addClass( 'hide-row-in-print' );
							}	
						});
						
						$('.analysis-row-checkbox').change(function(){
							var parts = this.id.split('-');
							var numb = parseInt(parts[3]);
							if(this.checked){			
								$('#analysis-table tbody tr:nth-child('+numb+')').addClass( 'show-row-in-print' );
								$('#analysis-table tbody tr:nth-child('+numb+')').removeClass( 'hide-row-in-print' );
							}
							if(!this.checked){	
								$('#analysis-table tbody tr:nth-child('+numb+')').removeClass( 'show-row-in-print' );	
								$('#analysis-table tbody tr:nth-child('+numb+')').addClass( 'hide-row-in-print' );	
							}	
						});	
						$('.analysis-col-checkbox').change(function(){
							var parts = this.id.split('-');
							var numb = parseInt(parts[3]);
							if(this.checked){
								$('#analysis-table td:nth-child('+numb+')').addClass( 'show-col-in-print' );	
								$('#analysis-table th:nth-child('+numb+')').addClass( 'show-col-in-print' );	
								$('#analysis-table td:nth-child('+numb+')').removeClass( 'hide-col-in-print' );	
								$('#analysis-table th:nth-child('+numb+')').removeClass( 'hide-col-in-print' );	
							}
							if(!this.checked){
								$('#analysis-table td:nth-child('+numb+')').removeClass( 'show-col-in-print' );
								$('#analysis-table th:nth-child('+numb+')').removeClass( 'show-col-in-print' );
								$('#analysis-table td:nth-child('+numb+')').addClass( 'hide-col-in-print' );
								$('#analysis-table th:nth-child('+numb+')').addClass( 'hide-col-in-print' );
							}	
						});	
					});

					/*Analüüsi tabeli skript:LÕPP*/
					
					
					/*checkboxi skript:ALGUS*/
					$(document).ready(function() {
						$('.regular-checkbox').attr('checked', false);
						
						$('.regular-checkbox').change(function() {
							var parts = this.id.split('-');
							if ($(this).is(':checked')) {
								$('#div-'+parts[1]+'-'+parts[2]).show();
							}
							else{
								$('#div-'+parts[1]+'-'+parts[2]).hide();
							}
						} );					
					});					
					/*checkboxi skript:LÕPP*/	
					
					/*Esimese tabeli lingi skript:ALGUS*/
					$(document).ready(function() {
						$('#header-table').css('display', 'none');
						

						$('#header-table-link').on( 'click', function(){
							if($('#header-table').css('display') == 'block'){
								$('#header-table').css('display', 'none');
								$text = $(this).attr('status_text').split(';');
								$('#header-table-link').text($text[0]);
							}else{
								$('#header-table').css('display', 'block');
								$text = $(this).attr('status_text').split(';');
								$('#header-table-link').text($text[1]);
							}
						});						
					});
					/*Esimese tabeli lingi skript:LÕPP*/

					/*Listi lingi skript:ALGUS*/
					$(document).ready(function() {
						$('.list-link').on( 'click', function(){
								$text = $(this).attr('status_text').split(';');
								$block_name = $(this).attr('block_name');
								console.log('boop');
								if($(this).text() == $text[0]){
									$(this).text($text[1]);
									$('.'+$block_name+'-checkbox').attr('checked' , true);
									$('.'+$block_name+'-openable').css('display' , 'block');
									
								}else{
									$(this).text($text[0]);
									$('.'+$block_name+'-checkbox').attr('checked' , false);
									$('.'+$block_name+'-openable').css('display' , 'none');
								}
						});						
					});					
					/*Listi lingi skript:LÕPP*/

					/*prindi skript:ALGUS*/
					$(document).keyup(function(e) {
					  if (e.keyCode == 27) { 
						$('#print-select').hide();
					  }   // esc
					});

					/*printimise valikud*/
					function checkOptions(opt) {
						if(opt == 'all'){
							if($('#print-'+opt).is(':checked')){
								$('.print-checkbox').attr('checked', true);
								$('#print-version-all').addClass('show-version');
								$('#print-version-part').removeClass('show-version');
								$('.data-block').removeClass('hide-block-in-print');
								$('.print-toggle').removeClass('hide-block-in-print');
							
							}
							else{
								$('.print-toggle').addClass('hide-block-in-print');
								$('#print-version-all').removeClass('show-version');
								$('#print-version-all').addClass('hide-block-in-print');
								$('#print-version-part').addClass('show-version');			
							}
						}
						else{
							$('#print-all').attr ( 'checked' , false );
							$('.print-toggle').addClass('hide-block-in-print');
							$('#print-version-all').addClass('hide-block-in-print');
							$('#print-version-all').removeClass('show-version');
							$('#print-version-part').addClass('show-version');
							
							if($('#print-'+opt).is(':checked')){
								$('#'+opt+'-block').removeClass('hide-block-in-print');	
							}
							else{
								$('#'+opt+'-block').addClass('hide-block-in-print');
							}
						}
					}

					/*kuva prindi menüü*/
					function showPrintOptions(){
						$('#print-select').toggle();	
					}

					/*alusta printimist*/
					function printpage(){
						$('#print-select').toggle();
						window.print();
					}
					$(document).ready(function() {
						$('.print-checkbox').attr('checked', true);
					});

					/*prindi skript:LÕPP*/
					