<?php

namespace App\Filament\Resources\AbstractSubmissions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class AbstractSubmissionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('title')
                    ->limit(30)
                    ->searchable()
                    ->wrap(),
                TextColumn::make('thematic_area')
                    ->label('Area')
                    ->badge()
                    ->color('info')
                    ->toggleable(),
                TextColumn::make('presentation_type')
                    ->badge()
                    ->color('gray'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'submitted' => 'success',
                        'reviewed' => 'info',
                        'rejected' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('language')
                    ->formatStateUsing(fn (string $state): string => strtoupper($state))
                    ->badge(),
                TextColumn::make('created_at')
                    ->label('Submitted On')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                \Filament\Tables\Filters\SelectFilter::make('thematic_area')
                    ->options([
                        'Stroke Epidemiology' => 'Stroke Epidemiology',
                        'Cardiovascular Risk & Prevention' => 'Cardiovascular Risk & Prevention',
                        'Clinical Stroke Management' => 'Clinical Stroke Management',
                        'Community Health & Access' => 'Community Health & Access',
                        'Health Communication & Behavior' => 'Health Communication & Behavior',
                        'Clinical Research Systems' => 'Clinical Research Systems',
                        'Digital Health & Innovation' => 'Digital Health & Innovation',
                        'Health Systems, Policy & Implementation' => 'Health Systems, Policy & Implementation',
                        'Data Science, AI & Predictive Modeling' => 'Data Science, AI & Predictive Modeling',
                    ]),
                \Filament\Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'submitted' => 'Submitted',
                        'reviewed' => 'Reviewed',
                        'rejected' => 'Rejected',
                    ]),
                TrashedFilter::make(),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    \Filament\Tables\Actions\ExportBulkAction::make()
                        ->label('Export to Excel'),
                ]),
            ]);
    }
}
